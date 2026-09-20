import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-pedido-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pedido-form.html',
  styleUrl: './pedido-form.css',
})
export class PedidoForm {
  private readonly fb = inject(FormBuilder);
  private readonly pedidosService = inject(PedidosService);

  submitting = signal(false);
  success = signal(false);
  error = signal(false);

  form = this.fb.nonNullable.group({
    cliente: ['', [Validators.required, Validators.minLength(2)]],
    producto: ['', [Validators.required, Validators.minLength(2)]],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    precio: [0, [Validators.required, Validators.min(0)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.success.set(false);
    this.error.set(false);

    this.pedidosService.crear(this.form.getRawValue()).subscribe({
      next: () => {
        this.submitting.set(false);
        this.success.set(true);
        this.form.reset({ cliente: '', producto: '', cantidad: 1, precio: 0 });
      },
      error: () => {
        this.submitting.set(false);
        this.error.set(true);
      },
    });
  }
}
