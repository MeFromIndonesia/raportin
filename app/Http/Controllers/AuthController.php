<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function registerPage()
    {
        return Inertia::render('Auth/Register');
    }

    public function loginPage()
    {
        return Inertia::render('Auth/Login');
    }

    public function registerPost(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'rememberMe' => ['boolean'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);


        Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->rememberMe);

        return redirect()->route('dashboard')->with('success', 'Anda telah terdaftar!');
    }

    public function loginPost(Request $request)
    {
        $credentials = $request->only('email', 'password', 'rememberMe');

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']], $credentials['rememberMe'] ?? false)) {
            $request->session()->regenerate();
            return redirect()->route('dashboard')->with('success', 'Anda telah masuk!');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login')->with('success', 'Anda telah keluar!');
    }
}
