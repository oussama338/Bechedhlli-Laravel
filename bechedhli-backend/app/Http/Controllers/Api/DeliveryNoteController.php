<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DeliveryNote;
use Illuminate\Http\Request;

class DeliveryNoteController extends Controller
{
    public function index()
    {
        return DeliveryNote::with('client', 'items')->orderBy('date', 'desc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|string|max:255|unique:delivery_notes,id',
            'client_id' => 'required|exists:clients,id',
            'type' => 'string|in:Mono,Tri',
            'date' => 'required|date',
            'puissance' => 'nullable|string|max:255',
            'ref_steg' => 'nullable|string|max:255',
            'transporteur_name' => 'nullable|string|max:255',
            'transporteur_matricule' => 'nullable|string|max:255',
            'items' => 'array',
            'items.*.n' => 'required|integer',
            'items.*.des' => 'required|string|max:255',
            'items.*.marque' => 'nullable|string|max:255',
            'items.*.cat' => 'nullable|string|max:255',
            'items.*.qty' => 'integer|min:1',
            'items.*.note' => 'nullable|string|max:255',
        ]);

        $items = $data['items'] ?? [];
        unset($data['items']);

        $data['status'] = 'waiting';
        $data['invoiced'] = false;

        $deliveryNote = DeliveryNote::create($data);

        foreach ($items as $item) {
            $deliveryNote->items()->create($item);
        }

        return $deliveryNote->load('client', 'items');
    }

    public function show(DeliveryNote $deliveryNote)
    {
        return $deliveryNote->load('client', 'items');
    }

    public function update(Request $request, DeliveryNote $deliveryNote)
    {
        $data = $request->validate([
            'client_id' => 'exists:clients,id',
            'type' => 'string|in:Mono,Tri',
            'date' => 'date',
            'status' => 'string|in:delivered,waiting',
            'invoiced' => 'boolean',
            'puissance' => 'nullable|string|max:255',
            'ref_steg' => 'nullable|string|max:255',
            'transporteur_name' => 'nullable|string|max:255',
            'transporteur_matricule' => 'nullable|string|max:255',
        ]);

        $deliveryNote->update($data);
        return $deliveryNote->load('client', 'items');
    }

    public function destroy(DeliveryNote $deliveryNote)
    {
        $deliveryNote->delete();
        return response()->noContent();
    }

    public function markDelivered(DeliveryNote $deliveryNote)
    {
        $deliveryNote->update(['status' => 'delivered']);
        return $deliveryNote->load('client', 'items');
    }

    public function markInvoiced(DeliveryNote $deliveryNote)
    {
        $deliveryNote->update(['invoiced' => true]);
        return $deliveryNote->load('client', 'items');
    }

    public function nextId()
    {
        $last = DeliveryNote::orderBy('id', 'desc')->first();
        $num = $last ? (int) substr($last->id, 2) + 1 : 40;
        return response()->json(['next_id' => 'BL' . str_pad((string) $num, 5, '0', STR_PAD_LEFT)]);
    }
}
