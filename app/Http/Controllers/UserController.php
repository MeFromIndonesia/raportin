<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('id')) {
            $ids = explode(',', $request->id);
            $query->whereIn('id', $ids);
        }

        $users = $query->paginate(10);

        return UserResource::collection($users);
    }

    public function edit(int $id)
    {
        return Inertia::render('Users/Edit', [
            'id' => $id,
        ]);
    }

    public function update(int $id, Request $request)
    {
        $request->validate([
            'name' => ['required', 'string','max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$request->id],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::find($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('dashboard')->with('success', "user dengan id $id berhasil diubah");
    }

    public function delete(int $id)
    {
        User::destroy($id);

        return redirect()->route('dashboard')->with('success', "user dengan id $id berhasil dihapus");
    }
}
