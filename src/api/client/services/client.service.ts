import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToClass, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { ClientDto } from '@/package/dto/client/client.dto';
import { DeleteDto } from '@/package/dto/response/delete.dto';
import { ClientEntity } from '@/package/entities/client/client.entity';
import { SystemException } from '@/package/exceptions/system.exception';
import { ExceptionService } from '@/package/services/exception.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly exceptionService: ExceptionService,
  ) {}

  search = async (
    page: number,
    limit: number,
    search: string,
  ): Promise<[ClientDto[], number]> => {
    try {
      const query = this.clientRepository.createQueryBuilder('q');

      query.select(['q.id', 'q.code', 'q.name']);

      if (search) {
        query.andWhere(
          '((q.code LIKE  :search) OR (q.name LIKE :search) OR (q.cell LIKE :search))',
          {
            search: `%${search}%`,
          },
        );
      }

      query.orderBy(`q.code`, 'DESC');

      if (page && limit) {
        query.skip((page - 1) * limit).take(limit);
      }

      const data = await query.getManyAndCount();

      return [plainToInstance(ClientDto, data[0]), data[1]];
    } catch (error) {
      throw new SystemException(error);
    }
  };

  pagination = async (
    page: number,
    limit: number,
    sort: string,
    order: string,
    search: string,
  ): Promise<[ClientDto[], number]> => {
    try {
      const query = this.clientRepository.createQueryBuilder('q');

      if (search) {
        query.andWhere(
          '((q.code LIKE  :search) OR (q.name LIKE :search) OR (q.cell LIKE :search))',
          {
            search: `%${search}%`,
          },
        );
      }

      if (sort && sort !== 'undefined') {
        if (order && order !== 'undefined') {
          let direction: 'DESC' | 'ASC' = 'DESC';
          if (['DESC', 'ASC'].includes(order.toUpperCase())) {
            direction = order.toUpperCase() as 'DESC' | 'ASC';
            query.orderBy(`q.${sort}`, direction);
          } else {
            query.orderBy(`q.${sort}`, direction);
          }
        } else {
          query.orderBy(`q.${sort}`, 'DESC');
        }
      } else {
        query.orderBy(`q.updatedAt`, 'DESC');
      }

      if (page && limit) {
        query.skip((page - 1) * limit).take(limit);
      }

      const data = await query.getManyAndCount();

      return [plainToInstance(ClientDto, data[0]), data[1]];
    } catch (error) {
      throw new SystemException(error);
    }
  };

  create = async (clientDto: ClientDto): Promise<ClientDto> => {
    try {
      const client = this.clientRepository.create(clientDto);
      await this.clientRepository.save(client);

      return this.getClient(client.id);
    } catch (error) {
      throw new SystemException(error);
    }
  };

  update = async (id: string, clientDto: ClientDto): Promise<ClientDto> => {
    try {
      const savedClient = await this.getClient(id);

      await this.clientRepository.save({
        ...savedClient,
        ...clientDto,
      });

      return this.getClient(id);
    } catch (error) {
      throw new SystemException(error);
    }
  };

  remove = async (id: string): Promise<DeleteDto> => {
    try {
      const deletedClient = await this.clientRepository.softDelete({
        id,
      });
      return Promise.resolve(new DeleteDto(!!deletedClient.affected));
    } catch (error) {
      throw new SystemException(error);
    }
  };
  /********************** Start checking relations of post ********************/

  getClient = async (id: string): Promise<ClientDto> => {
    const client = await this.clientRepository
      .createQueryBuilder('q')
      .andWhere('q.id =:id', { id })
      .getOneOrFail();

    this.exceptionService.notFound(client, 'Client Not Found!!');
    return plainToClass(ClientDto, client);
  };
  /*********************** End checking relations of post *********************/
}
