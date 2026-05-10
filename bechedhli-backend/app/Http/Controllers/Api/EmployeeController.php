<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'dept' => 'required|string|max:255',
            'status' => 'string|in:active,inactive,leave',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'salary' => 'integer|min:0',
            'join_date' => 'nullable|date',
        ]);

        return Employee::create($data);
    }

    public function show(Employee $employee)
    {
        return $employee;
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'name' => 'string|max:255',
            'role' => 'string|max:255',
            'dept' => 'string|max:255',
            'status' => 'string|in:active,inactive,leave',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'salary' => 'integer|min:0',
            'join_date' => 'nullable|date',
        ]);

        $employee->update($data);
        return $employee;
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->noContent();
    }
}
