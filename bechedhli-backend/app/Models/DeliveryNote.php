<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryNote extends Model
{
    protected $fillable = [
        'id', 'client_id', 'type', 'date', 'status', 'invoiced',
        'puissance', 'ref_steg', 'transporteur_name', 'transporteur_matricule',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'invoiced' => 'boolean',
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function items()
    {
        return $this->hasMany(DeliveryNoteItem::class, 'delivery_note_id', 'id');
    }
}
