<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['client_id', 'items', 'total', 'received', 'received_date', 'order_date'];

    protected function casts(): array
    {
        return [
            'items' => 'array',
            'total' => 'integer',
            'received' => 'boolean',
            'received_date' => 'date',
            'order_date' => 'date',
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
