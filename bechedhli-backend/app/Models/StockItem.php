<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockItem extends Model
{
    protected $fillable = ['name', 'category', 'qty', 'min_qty', 'price', 'supplier', 'location'];

    protected function casts(): array
    {
        return [
            'qty' => 'integer',
            'min_qty' => 'integer',
            'price' => 'integer',
        ];
    }
}
