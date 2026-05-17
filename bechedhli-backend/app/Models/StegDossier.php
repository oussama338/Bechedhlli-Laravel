<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StegDossier extends Model
{
    protected $fillable = ['client_id', 'ref_steg', 'puissance', 'status', 'docs', 'notes', 'submitted_date', 'approved_date'];

    protected function casts(): array
    {
        return [
            'docs' => 'array',
            'submitted_date' => 'date',
            'approved_date' => 'date',
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
