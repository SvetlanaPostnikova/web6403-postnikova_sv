from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs


class OrderHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/orders":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", "0"))
        if not 0 < length <= 16384:
            self.send_error(400)
            return

        body = self.rfile.read(length).decode("utf-8", errors="replace")
        fields = parse_qs(body)

        name = fields.get("name", [""])[0].strip()
        email = fields.get("email", [""])[0].strip()
        description = fields.get("description", [""])[0].strip()
        consent = fields.get("consent", [""])[0]

        if not (0 < len(name) <= 80 and "@" in email and len(email) <= 254
                and 0 < len(description) <= 600 and consent == "yes"):
            self.send_error(400)
            return

        message = "Спасибо!Ваша заявка принята.".encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(message)))
        self.end_headers()
        self.wfile.write(message)


if __name__ == "__main__":
    site_folder = Path(__file__).resolve().parent
    handler = partial(OrderHandler, directory=str(site_folder))

    with ThreadingHTTPServer(("127.0.0.1", 8000), handler) as server:
        print("Сайт открыт по адресу http://127.0.0.1:8000", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
