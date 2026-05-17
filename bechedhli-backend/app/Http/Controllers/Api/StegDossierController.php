<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StegDossier;
use Illuminate\Http\Request;

class StegDossierController extends Controller
{
    public function index()
    {
        return StegDossier::with('client')->orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'ref_steg' => 'required|string|max:255',
            'puissance' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $data['status'] = 'prep';
        $data['docs'] = [];

        return StegDossier::create($data);
    }

    public function show(StegDossier $stegDossier)
    {
        return $stegDossier->load('client');
    }

    public function update(Request $request, StegDossier $stegDossier)
    {
        $data = $request->validate([
            'ref_steg' => 'string|max:255',
            'puissance' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'docs' => 'nullable|array',
        ]);

        $stegDossier->update($data);
        return $stegDossier->load('client');
    }

    public function destroy(StegDossier $stegDossier)
    {
        $stegDossier->delete();
        return response()->noContent();
    }

    public function submit(StegDossier $stegDossier)
    {
        $stegDossier->update([
            'status' => 'submitted',
            'submitted_date' => now()->toDateString(),
        ]);
        return $stegDossier->load('client');
    }

    public function approve(StegDossier $stegDossier)
    {
        $stegDossier->update([
            'status' => 'approved',
            'approved_date' => now()->toDateString(),
        ]);
        return $stegDossier->load('client');
    }

    public function reject(StegDossier $stegDossier)
    {
        $stegDossier->update(['status' => 'rejected']);
        return $stegDossier->load('client');
    }
}
