import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from "jsonwebtoken";
import { EnvConfigService } from '@/package/services/env-config.service';
import { IsPublicSymbolName } from '@/package/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly envConfigService: EnvConfigService
    ) {
    }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(IsPublicSymbolName, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;
        const request = context.switchToHttp().getRequest();
        let token = request.headers.authorization as string;

        const authFail = () => {
            throw new ForbiddenException("Authentication failed. Please Try again!");
        };

        if (token) token = token.replace("Bearer ", "");
        if (token.startsWith("ey")) {
            try {
                const _user = jwt.verify(token, this.envConfigService.get<string>("JWT_SECRET")) as Record<string, any>;
                if (_user?.user?.id) {
                    request['_user'] = _user
                    return true;
                }
            } catch (e) {
            }
        }
        authFail();
    }
}
