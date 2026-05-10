<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DeliveryNoteItem;
use Illuminate\Http\Request;

class DeliveryNoteItemController extends Controller
{
    public function index($deliveryNoteId)
    {
        return DeliveryNoteItem::where('delivery_note_id', $deliveryNoteId)->orderBy('n')->get();
    }

    public function store(Request $request, $deliveryNoteId)
    {
        $data = $request->validate([
            'n' => 'required|integer',
            'des' => 'required|string|max:255',
            'marque' => 'nullable|string|max:255',
            'cat' => 'nullable|string|max:255',
            'qty' => 'integer|min:1',
            'note' => 'nullable|string|max:255',
        ]);

        $data['delivery_note_id'] = $deliveryNoteId;
        return DeliveryNoteItem::create($data);
    }

    public function update(Request $request, DeliveryNoteItem $deliveryNoteItem)
    {
        $data = $request->validate([
            'n' => 'integer',
            'des' => 'string|max:255',
            'marque' => 'nullable|string|max:255',
            'cat' => 'nullable|string|max:255',
            'qty' => 'integer|min:1',
            'note' => 'nullable|string|max:255',
        ]);

        $deliveryNoteItem->update($data);
        return $deliveryNoteItem;
    }

    public function destroy(DeliveryNoteItem $deliveryNoteItem)
    {
        $deliveryNoteItem->delete();
        return response()->noContent();
    }
}
