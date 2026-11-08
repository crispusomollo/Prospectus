import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { LineChart, Wallet, Briefcase, BriefcaseBusiness, History, Activity, Database, Laptop, Code, Landmark } from 'lucide-react';

export default function Dashboard({ financials, dealsValue, projectsStatus, recentFollowUps, catalogBreakdown }) {
    
    // Fallback normalization logic helper for inventory items breakdown variables
    const getCatalogMetric = (typeKey) => {
        const entry = catalogBreakdown.find(item => item.type === typeKey);
        return entry ? { total: entry.total_items, stock: entry.current_stock } : { total: 0, stock: 0 };
    };

    const hardwareStats = getCatalogMetric('hardware');
    const softwareStats = getCatalogMetric('software');
    const consultancyStats = getCatalogMetric('consultancy');

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-slate-800 flex items-center gap-2"><Activity className="text-indigo-600"/> Prospectus Executive BI Intelligence Dashboard</h2>}
        >
            <Head title="Executive Dashboard" />

            <div className="py-6 bg-slate-100 min-h-screen space-y-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    
                    {/* FINANCIAL LEDGER OVERVIEWS BANNER ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Gross Income Cash Inflows</span>
                                <h3 className="text-xl font-black text-slate-900 font-mono">KES {financials.income.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                            </div>
                            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-emerald-600"><Landmark size={20}/></div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Operational Cost Outlays</span>
                                <h3 className="text-xl font-black text-slate-900 font-mono">KES {financials.expenses.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                            </div>
                            <div className="bg-rose-50 p-3 rounded-xl border border-rose-100 text-rose-600"><Wallet size={20}/></div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Net Profit / Loss Margins</span>
                                <h3 className={`text-xl font-black font-mono ${financials.profit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>KES {financials.profit.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                            </div>
                            <div className={`p-3 rounded-xl border ${financials.profit >= 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}><LineChart size={20}/></div>
                        </div>
                    </div>

                    {/* DYNAMIC OFFERINGS INVENTORY CATALOG VALUES MATRIX CARD */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Database size={14} className="text-indigo-600"/> Offerings Catalog Portfolio Summary</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-slate-50 border rounded-xl p-4 flex items-center gap-3">
                                <div className="bg-blue-100 text-blue-700 p-2.5 rounded-lg"><Laptop size={18}/></div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{hardwareStats.total} Hardware Items</p>
                                    <p className="text-[10px] text-slate-400 font-medium font-mono">Available Stock: {hardwareStats.stock} Units</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 border rounded-xl p-4 flex items-center gap-3">
                                <div className="bg-purple-100 text-indigo-700 p-2.5 rounded-lg"><Code size={18}/></div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{softwareStats.total} Software Suites</p>
                                    <p className="text-[10px] text-slate-400 font-medium font-mono">Total Provisioned Licenses: {softwareStats.stock} Seats</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 border rounded-xl p-4 flex items-center gap-3">
                                <div className="bg-amber-100 text-amber-700 p-2.5 rounded-lg"><BriefcaseBusiness size={18}/></div>

                                <div>
                                    <p className="font-bold text-slate-800 text-sm">{consultancyStats.total} Consultancy Tiers</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Standard Hours Rate Matrix Active</p>
                                </div>
                            </div>
                        </div>
                    </div>

                                        {/* OPERATIONS PIPELINE & TIMELINE CHRONOLOGY ROWS LIST */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                        
                        {/* DEALS PIPELINE PIPELINE CAP (COL-SPAN 2) */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                <Briefcase size={14} className="text-slate-400"/> Sales Pipelines Operations
                            </div>
                            <div className="p-5 space-y-4 text-xs font-semibold">
                                <div className="bg-indigo-900 text-white rounded-xl p-4 text-center space-y-1">
                                    <span className="text-[10px] font-black uppercase text-indigo-300 tracking-widest block">Active Negotiations Pipeline Weight</span>
                                    <h2 className="text-xl font-black font-mono">KES {dealsValue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
                                </div>
                                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                                    <div className="p-3 flex justify-between">
                                        <span>Pending / Proposed Deals:</span> 
                                        <span className="font-mono font-bold text-slate-700">{projectsStatus.pending} Projects</span>
                                    </div>
                                    <div className="p-3 flex justify-between bg-slate-50/30">
                                        <span>Active Execution Phase:</span> 
                                        <span className="font-mono font-bold text-indigo-600">{projectsStatus.active} Projects</span>
                                    </div>
                                    <div className="p-3 flex justify-between">
                                        <span>Completed / Dispatched:</span> 
                                        <span className="font-mono font-bold text-emerald-600">{projectsStatus.completed} Projects</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PROJECT TIMELINE FOLLOW-UPS PROGRESS STREAM LOGGER (COL-SPAN 3) */}
                        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                                <History size={14} className="text-slate-400"/> Recent Project Timeline & Follow-Up Logs
                            </div>
                            <div className="p-4 divide-y divide-slate-100">
                                {recentFollowUps.length === 0 ? (
                                    <p className="text-xs text-slate-400 italic text-center py-12 font-medium">Zero project interaction trace follow-ups recorded in this session layout.</p>
                                ) : (
                                    recentFollowUps.map((log) => (
                                        <div key={log.id} className="py-3.5 space-y-1 text-xs font-semibold">
                                            <div className="flex justify-between items-center">
                                                <span className="text-indigo-600 font-bold bg-indigo-50 border border-indigo-100/40 px-2 py-0.5 rounded">{log.project_name}</span>
                                                <span className="text-[10px] text-slate-400 font-mono">{new Date(log.created_at).toLocaleString()}</span>
                                            </div>
                                            <p className="text-slate-800 font-medium leading-relaxed">{log.notes}</p>
                                            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-0.5">
                                                <span>Logged By: <strong className="text-slate-600 font-semibold">{log.employee_name}</strong></span>
                                                {log.milestone_reached && (
                                                    <><span>•</span> <span>Milestone: <strong className="text-emerald-600 font-black">{log.milestone_reached}</strong></span></>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
