'''
 ════════════════════════════════════════════════════════════════════════════
  WARNING: CLASSIFIED TECHNOLOGY // TIER 0 CLEARANCE REQUIRED
 ════════════════════════════════════════════════════════════════════════════
  COPYRIGHT © 2026 GlacierEQ × ANTIGRAVITY.

  This file contains "Stealth" and "Ring-Level" technologies.
  UNAUTHORIZED ACCESS, COPYING, OR REVERSE ENGINEERING IS FORBIDDEN.

  DANGER: Capable of hardware-level interaction (Ring -3 to Ring -6).
  Operate strictly within authorized "God Mode" parameters.

  PROPERTY OF GLACIEREQ. DO NOT DISTRIBUTE.
 ════════════════════════════════════════════════════════════════════════════
'''

import sys
import json
import os
from pathlib import Path

# Add the project root to sys.path to allow importing services
PROJECT_ROOT = "/Users/macarena1/amazon-q-backups/20251106_101834/FEDERAL-FORENSIC-REPAIR-OMNIBUS"
sys.path.append(PROJECT_ROOT)

try:
    from services.mastermind_service import MastermindBridge
except ImportError:
    # If import fails, try adding the directory containing services directly
    sys.path.append(os.path.join(PROJECT_ROOT, "services"))
    try:
        from mastermind_service import MastermindBridge
    except ImportError as e:
        print(json.dumps({"error": f"Failed to import MastermindBridge: {str(e)}"}))
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No command provided"}))
        sys.exit(1)

    # Change to project root so relative paths in MastermindBridge work
    os.chdir(PROJECT_ROOT)

    command = sys.argv[1]
    bridge = MastermindBridge()

    result = {}

    try:
        if command == "diagnostics":
            result = bridge.run_diagnostics()
        elif command == "chain":
            result = bridge.get_chain_of_custody()
        elif command == "repair":
             if len(sys.argv) < 3:
                 result = {"error": "Missing issue type for repair"}
             else:
                 issue_type = sys.argv[2]
                 result = bridge.run_repair(issue_type)
        elif command == "process":
             if len(sys.argv) < 4:
                 result = {"error": "Missing arguments for process"}
             else:
                 file_path = sys.argv[2]
                 evidence_type = sys.argv[3]
                 result = bridge.process_evidence(file_path, evidence_type)
        else:
            result = {"error": f"Unknown command: {command}"}

        print(json.dumps(result, indent=2))

    except Exception as e:
        print(json.dumps({"error": f"Execution failed: {str(e)}"}))
        sys.exit(1)

if __name__ == "__main__":
    main()
