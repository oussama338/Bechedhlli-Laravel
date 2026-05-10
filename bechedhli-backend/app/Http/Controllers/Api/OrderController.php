<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Client;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with('client')->orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'items' => 'required|array',
            'items.*' => 'string',
            'total' => 'integer|min:0',
            'order_date' => 'required|date',
        ]);

        $data['received'] = $request->boolean('received', false);
        $data['total'] ??= 0;

        $order = Order::create($data);
        return $order->load('client');
    }

    public function show(Order $order)
    {
        return $order->load('client');
    }

    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'items' => 'array',
            'items.*' => 'string',
            'total' => 'integer|min:0',
            'received' => 'boolean',
            'received_date' => 'nullable|date',
            'order_date' => 'date',
        ]);

        $order->update($data);
        return $order->load('client');
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->noContent();
    }

    public function markReceived(Order $order)
    {
        $order->update([
            'received' => true,
            'received_date' => now()->toDateString(),
        ]);
        return $order->load('client');
    }
}
