<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StockItem;
use Illuminate\Http\Request;

class StockItemController extends Controller
{
    public function index()
    {
        return StockItem::orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'qty' => 'integer|min:0',
            'min_qty' => 'integer|min:0',
            'price' => 'integer|min:0',
            'supplier' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        return StockItem::create($data);
    }

    public function show(StockItem $stockItem)
    {
        return $stockItem;
    }

    public function update(Request $request, StockItem $stockItem)
    {
        $data = $request->validate([
            'name' => 'string|max:255',
            'category' => 'string|max:255',
            'qty' => 'integer|min:0',
            'min_qty' => 'integer|min:0',
            'price' => 'integer|min:0',
            'supplier' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);

        $stockItem->update($data);
        return $stockItem;
    }

    public function destroy(StockItem $stockItem)
    {
        $stockItem->delete();
        return response()->noContent();
    }
}
