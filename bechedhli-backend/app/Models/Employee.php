<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = ['name', 'role', 'dept', 'status', 'phone', 'email', 'salary', 'join_date'];

    protected function casts(): array
    {
        return [
            'join_date' => 'date',
            'salary' => 'integer',
        ];
    }
}
