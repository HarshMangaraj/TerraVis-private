"use client";

export function AIAgentsStatus() {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">AI Agents Status</h3>
      </div>

      <div className="relative flex-1 flex items-center justify-center min-h-[160px] overflow-hidden bg-[#090b11]/20 rounded-lg">
        {/* Animated Connecting Lines via SVG */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Paths connecting central node (50, 50) to other nodes */}
          <line x1="50" y1="50" x2="50" y2="20" stroke="rgba(91, 75, 251, 0.4)" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1="50" y1="50" x2="82" y2="40" stroke="rgba(91, 75, 251, 0.4)" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1="50" y1="50" x2="72" y2="78" stroke="rgba(91, 75, 251, 0.4)" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1="50" y1="50" x2="28" y2="78" stroke="rgba(91, 75, 251, 0.4)" strokeWidth="0.8" strokeDasharray="3,3" />
          <line x1="50" y1="50" x2="18" y2="40" stroke="rgba(91, 75, 251, 0.4)" strokeWidth="0.8" strokeDasharray="3,3" />
          
          {/* Animated signal dots */}
          <circle cx="50" cy="50" r="1.5" fill="#a5b4fc">
            <animate attributeName="cy" from="50" to="20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="1.5" fill="#a5b4fc">
            <animate attributeName="cx" from="50" to="82" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50" to="40" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="1.5" fill="#a5b4fc">
            <animate attributeName="cx" from="50" to="72" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50" to="78" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="1.5" fill="#a5b4fc">
            <animate attributeName="cx" from="50" to="28" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50" to="78" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="50" cy="50" r="1.5" fill="#a5b4fc">
            <animate attributeName="cx" from="50" to="18" dur="2.1s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50" to="40" dur="2.1s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="1" to="0" dur="2.1s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Central Node: AI Orchestrator */}
        <div className="absolute left-[38%] top-[38%] w-[24%] h-[24%] rounded-full bg-gradient-to-br from-[#5b4bfb] to-[#4338ca] flex flex-col items-center justify-center border border-indigo-400/20 shadow-[0_0_15px_rgba(91,75,251,0.3)] z-10 hover:scale-105 transition-transform duration-300">
          <span className="text-[7px] font-bold text-indigo-200 uppercase leading-none">AI</span>
          <span className="text-[8px] font-extrabold text-white text-center leading-tight mt-0.5">Orchestrator</span>
        </div>

        {/* Node 1: Cloud Agent (Top) */}
        <div className="absolute left-[37%] top-[3%] w-[26%] flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-full bg-[#10b981]/10 border border-[#10b981]/40 flex items-center justify-center text-[10px] text-[#10b981]">
            ☁️
          </div>
          <span className="text-[8px] font-semibold text-foreground mt-0.5">Cloud Agent</span>
          <span className="text-[7px] text-[#10b981] leading-none">Active</span>
        </div>

        {/* Node 2: IR Enhancement Agent (Right) */}
        <div className="absolute left-[70%] top-[32%] w-[26%] flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-full bg-[#10b981]/10 border border-[#10b981]/40 flex items-center justify-center text-[10px] text-[#10b981]">
            ✨
          </div>
          <span className="text-[8px] font-semibold text-foreground mt-0.5">IR Agent</span>
          <span className="text-[7px] text-[#10b981] leading-none">Active</span>
        </div>

        {/* Node 3: Validation Agent (Bottom Right) */}
        <div className="absolute left-[60%] top-[68%] w-[26%] flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-full bg-[#10b981]/10 border border-[#10b981]/40 flex items-center justify-center text-[10px] text-[#10b981]">
            ✅
          </div>
          <span className="text-[8px] font-semibold text-foreground mt-0.5">Validation</span>
          <span className="text-[7px] text-[#10b981] leading-none">Active</span>
        </div>

        {/* Node 4: Fusion Agent (Bottom Left) */}
        <div className="absolute left-[14%] top-[68%] w-[26%] flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-full bg-[#10b981]/10 border border-[#10b981]/40 flex items-center justify-center text-[10px] text-[#10b981]">
            🧬
          </div>
          <span className="text-[8px] font-semibold text-foreground mt-0.5">Fusion Agent</span>
          <span className="text-[7px] text-[#10b981] leading-none">Active</span>
        </div>

        {/* Node 5: Report Agent (Left) */}
        <div className="absolute left-[4%] top-[32%] w-[26%] flex flex-col items-center text-center">
          <div className="h-6 w-6 rounded-full bg-[#10b981]/10 border border-[#10b981]/40 flex items-center justify-center text-[10px] text-[#10b981]">
            📊
          </div>
          <span className="text-[8px] font-semibold text-foreground mt-0.5">Report Agent</span>
          <span className="text-[7px] text-[#10b981] leading-none">Active</span>
        </div>
      </div>
    </div>
  );
}
