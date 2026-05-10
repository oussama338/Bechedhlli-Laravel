<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryNoteItem extends Model
{
    protected $fillable = ['delivery_note_id', 'n', 'des', 'marque', 'cat', 'qty', 'note'];

    protected function casts(): array
    {
        return [
            'qty' => 'integer',
        ];
    }

    public function deliveryNote()
    {
        return $this->belongsTo(DeliveryNote::class);
    }
}
