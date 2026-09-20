import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pedido } from '../../models/pedido.model';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pedidos-list',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './pedidos-list.html',
  styleUrl: './pedidos-list.css',
})
export class PedidosList implements OnInit {
  private readonly pedidosService = inject(PedidosService);

  pedidos = signal<Pedido[]>([]);
  loading = signal(true);
  error = signal(false);

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.loading.set(true);
    this.error.set(false);

    this.pedidosService.listar().subscribe({
      next: (pedidos) => {
        this.pedidos.set(pedidos);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
