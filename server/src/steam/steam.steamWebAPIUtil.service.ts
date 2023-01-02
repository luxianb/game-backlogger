import { AxiosError } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom, catchError } from 'rxjs';

const key = process.env.STEAM_API_KEY;

@Injectable()
export class SteamWebAPIUtilService {
  private readonly logger = new Logger(SteamWebAPIUtilService.name);
  constructor(private readonly httpService: HttpService) {}

  async getServerInfo(): Promise<any> {
    const url = `https://api.steampowered.com/ISteamWebAPIUtil/GetServerInfo/v1/`;

    const data = await lastValueFrom(
      this.httpService.get(url).pipe(
        map((res) => res?.data),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'Error fetching data';
        }),
      ),
    );
    return data;
  }
  async getSupportedAPIList(): Promise<any> {
    const url = `https://api.steampowered.com/ISteamWebAPIUtil/GetSupportedAPIList/v1/`;
    const params = { key };

    const data = await lastValueFrom(
      this.httpService.get(url, { params }).pipe(
        map((res) => res?.data),
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw 'Error fetching data';
        }),
      ),
    );
    return data;
  }
}
