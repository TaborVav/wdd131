/*
===========================
🌐 DIALOGUE FLOW MAP
===========================

boot
 ├── Hello? -> remnant_intro
 │             ├── Yes, vaguely. -> archives_intro
 │             └── No, what blackout? -> fragments_intro
 │                                  └── Back away. -> session_end
 │                                  └── Show me the fragments. -> file_found
 └── Who are you? -> founder_identity
                   ├── What do you mean? -> archives_intro
                   └── Terminate session -> session_end

archives_intro
 ├── Search archives -> file_found
 └── Ignore and proceed -> anomaly_detected

file_found
 ├── View file -> code_hint
 └── Decline -> anomaly_detected

code_hint
 ├── Try to decode -> anomaly_detected
 └── Save it for later -> anomaly_detected

anomaly_detected
 ├── Open anomaly report -> tampering_warning
 └── Ignore and continue search -> system_confrontation

tampering_warning
 ├── Confront the system -> system_confrontation
 └── Stay silent for now -> system_monitoring

system_confrontation
 ├── End session -> session_end
 └── Probe for more info -> system_monitoring

system_monitoring
 ├── Log off -> session_end
 └── Investigate deeper -> anomaly_detected (loops)

session_end (TERMINAL ENDING)
===========================
*/
