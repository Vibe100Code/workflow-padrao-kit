#!/usr/bin/env python3
# UserPromptSubmit: registra TODO pedido do dono num arquivo e, no 1º pedido de cada
# sessão, lembra as fontes de decisão. Origem: pedidos se perdiam entre sessões (22/10);
# "hooks não podem atrapalhar" (dono, 22/10) → o lembrete sai uma vez só por sessão.
# Configure: COORD_DIR (padrão ~/.coord). Falha aberta: qualquer erro sai em silêncio.
import json, sys, os, datetime, fcntl
try:
    d = json.load(sys.stdin)
    p = (d.get("prompt") or "").strip()
    if not p or p.startswith("<"): sys.exit(0)
    coord = os.path.expanduser(os.environ.get("COORD_DIR", "~/.coord"))
    os.makedirs(coord, exist_ok=True)
    ledger = os.path.join(coord, "PEDIDOS-DO-DONO.jsonl")
    with open(ledger, "a") as f:
        fcntl.flock(f, fcntl.LOCK_EX)
        f.write(json.dumps({"quando": datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
            "sessao": d.get("session_id", "")[:8], "cwd": d.get("cwd", ""), "pedido": p[:2000],
            "estado": "aberto"}, ensure_ascii=False) + "\n")
    marca = os.path.expanduser("~/.cache/wf-pedidos/" + "".join(c for c in d.get("session_id", "x") if c.isalnum() or c in "-_"))
    if os.path.exists(marca): sys.exit(0)
    os.makedirs(os.path.dirname(marca), exist_ok=True); open(marca, "w").close()
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext":
        f"[pedidos do dono] Pedido registrado em {ledger}. ANTES de decidir ou afirmar: (1) DECISOES.md e regras/ do projeto + "
        f"{coord}/DECISOES-DO-COORDENADOR.md + memória; (2) 'não existe' só depois de procurar nessas fontes; "
        "(3) ao despachar, repasse o pedido LITERAL do dono; (4) ao concluir, marque o pedido como feito no registro."}}, ensure_ascii=False))
except Exception:
    pass
sys.exit(0)
