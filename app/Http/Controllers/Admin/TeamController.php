<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index() { return Inertia::render('Admin/Team/Index', ['members' => TeamMember::orderBy('order')->get()]); }
    public function create() { return Inertia::render('Admin/Team/Edit', ['member' => null]); }
    public function store(Request $request) {
        TeamMember::create($request->validate(['name' => 'required|string|max:255', 'designation' => 'required|string|max:255', 'bio' => 'nullable|string', 'image' => 'nullable|string', 'order' => 'nullable|integer', 'is_active' => 'boolean', 'show_public' => 'boolean']));
        return redirect()->route('admin.team.index')->with('success', 'Team member added.');
    }
    public function edit(TeamMember $team) { return Inertia::render('Admin/Team/Edit', ['member' => $team]); }
    public function update(Request $request, TeamMember $team) {
        $team->update($request->validate(['name' => 'required|string|max:255', 'designation' => 'required|string|max:255', 'bio' => 'nullable|string', 'image' => 'nullable|string', 'order' => 'nullable|integer', 'is_active' => 'boolean', 'show_public' => 'boolean']));
        return back()->with('success', 'Team member updated.');
    }
    public function destroy(TeamMember $team) { $team->delete(); return redirect()->route('admin.team.index')->with('success', 'Member removed.'); }
}
