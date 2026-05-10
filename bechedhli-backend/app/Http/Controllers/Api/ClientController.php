<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return Client::with('orders')->orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'cin' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        $client = Client::create($data);
        return $client->load('orders');
    }

    public function show(Client $client)
    {
        return $client->load('orders');
    }

    public function update(Request $request, Client $client)
    {
        $data = $request->validate([
            'name' => 'string|max:255',
            'cin' => 'string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        $client->update($data);
        return $client->load('orders');
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response()->noContent();
    }
}
