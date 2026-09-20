import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { NuevoPedido, Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidosService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiConfig.uri}/pedidos`;

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  crear(pedido: NuevoPedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.baseUrl, pedido);
  }
}
