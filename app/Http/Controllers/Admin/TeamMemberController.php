<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamMember;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class TeamMemberController extends Controller
{
    public function index()
    {
        $team = TeamMember::latest()->get();
        return Inertia::render('admin/team/index', [
            'team' => $team
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|image|max:10240'
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'team_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        TeamMember::create($validated);

        return redirect()->back()->with('success', 'Team member added successfully.');
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'image' => 'nullable|image|max:10240'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($teamMember->image_path) {
                $oldPath = public_path($teamMember->image_path);
                if (File::exists($oldPath)) {
                    File::delete($oldPath);
                }
            }

            $file = $request->file('image');
            $filename = 'team_' . time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('assets/images'), $filename);
            $validated['image_path'] = 'assets/images/' . $filename;
        }

        if ($request->input('remove_image') == '1' || $request->input('remove_image') === true) {
            if ($teamMember->image_path) {
                $oldPath = public_path($teamMember->image_path);
                if (File::exists($oldPath)) {
                    File::delete($oldPath);
                }
            }
            $validated['image_path'] = null;
        }

        $teamMember->update($validated);

        return redirect()->back()->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        if ($teamMember->image_path) {
            $oldPath = public_path($teamMember->image_path);
            if (File::exists($oldPath)) {
                File::delete($oldPath);
            }
        }

        $teamMember->delete();

        return redirect()->back()->with('success', 'Team member removed successfully.');
    }
}
