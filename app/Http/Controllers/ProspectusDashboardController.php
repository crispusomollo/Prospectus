<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProspectusDashboardController extends Controller
{
    /**
     * Compile real-time prospectus insights and corporate operations summaries.
     */
    public function index()
    {
        // 1. Calculate P&L Statements Metrics
        $totalIncome = DB::table('financial_ledgers')->where('type', 'income')->sum('amount') ?? 0;
        $totalExpenses = DB::table('financial_ledgers')->where('type', 'expense')->sum('amount') ?? 0;
        $netProfitLoss = $totalIncome - $totalExpenses;

        // 2. Extract Pipeline Deal Value
        $activeDealsValue = DB::table('deals')->whereIn('stage', ['lead', 'negotiation'])->sum('total_value') ?? 0;

        // 3. Compile Project Progress Turnouts
        $projectsCount = DB::table('projects')
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        // 4. Extract Real-Time Timelines Trace Follow-ups
        $recentFollowUps = DB::table('project_follow_ups')
            ->join('projects', 'project_follow_ups.project_id', '=', 'projects.id')
            ->join('users', 'project_follow_ups.user_id', '=', 'users.id')
            ->select('project_follow_ups.*', 'projects.name as project_name', 'users.name as employee_name')
            ->orderBy('project_follow_ups.created_at', 'desc')
            ->take(5)
            ->get();

        // 5. Break down Inventory Sales Catalog Volume By Type
        $itemsCatalogBreakdown = DB::table('items')
            ->select('type', DB::raw('count(*) as total_items'), DB::raw('COALESCE(SUM(stock_level), 0) as current_stock'))
            ->groupBy('type')
            ->get();

        return Inertia::render('Dashboard', [
            'financials' => [
                'income' => (float)$totalIncome,
                'expenses' => (float)$totalExpenses,
                'profit' => (float)$netProfitLoss
            ],
            'dealsValue' => (float)$activeDealsValue,
            'projectsStatus' => [
                'pending' => $projectsCount->get('pending', 0),
                'active' => $projectsCount->get('active', 0),
                'completed' => $projectsCount->get('completed', 0),
            ],
            'recentFollowUps' => $recentFollowUps,
            'catalogBreakdown' => $itemsCatalogBreakdown
        ]);
    }
}
