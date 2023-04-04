import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTenants(): string[] {
    const tenants = ['Tenant 1', 'Tenant 2', 'Tenant 3', 'Tenant 4'];
    return tenants;
  }
}
