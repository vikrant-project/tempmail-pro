# 📧 TempMail Pro - Self-Hosted Temporary Email Service

> **Privacy-first, token-based temporary email service — No registration, no passwords, just instant disposable emails.**

![License](https://img.shields.io/badge/license-MIT-6366f1) ![Node.js](https://img.shields.io/badge/node-20+-6366f1) ![React](https://img.shields.io/badge/React-18+-ec4899) ![Status](https://img.shields.io/badge/status-active-10b981) ![API](https://img.shields.io/badge/API-REST+WebSocket-ec4899) ![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)

A blazing-fast, fully-featured **self-hosted** temporary email service with real-time inbox updates, DKIM-signed outbound emails, comprehensive REST API, WebSocket support, and a beautiful dark-themed dashboard. Built for developers, privacy enthusiasts, and anyone who wants **instant disposable email addresses** without the hassle.

```
████████╗███████╗███╗   ███╗██████╗ ███╗   ███╗ █████╗ ██╗██╗         ██████╗ ██████╗  ██████╗ 
╚══██╔══╝██╔════╝████╗ ████║██╔══██╗████╗ ████║██╔══██╗██║██║         ██╔══██╗██╔══██╗██╔═══██╗
   ██║   █████╗  ██╔████╔██║██████╔╝██╔████╔██║███████║██║██║         ██████╔╝██████╔╝██║   ██║
   ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║╚██╔╝██║██╔══██║██║██║         ██╔═══╝ ██╔══██╗██║   ██║
   ██║   ███████╗██║ ╚═╝ ██║██║     ██║ ╚═╝ ██║██║  ██║██║███████╗    ██║     ██║  ██║╚██████╔╝
   ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ 
                                    :: p r i v a c y _ f i r s t ::
```

---

## ⚡ Demo & Highlights

🎯 **Token-based authentication** — No email/password required. Get a 40-character token and start receiving emails instantly.

✨ **Real-time inbox** — Watch emails arrive live via WebSocket streaming. No refresh needed.

🔐 **DKIM-signed outbound** — Send emails from your temp addresses with proper email authentication (SPF, DKIM, DMARC).

📊 **Analytics dashboard** — Track API usage, token consumption, and error rates in real-time.

🌐 **Multi-domain support** — Use multiple subdomains for different purposes.

---

## 🚀 Why TempMail Pro?

| Feature                        | TempMail Pro 🦾 | Free Services 🖐️ | Paid Solutions 💸 |
|--------------------------------|:---------------:|:-----------------:|:-----------------:|
| No registration required       |       ✅        |    Sometimes      |        ❌         |
| Token-based auth (no password) |       ✅        |        ❌         |        ❌         |
| Real-time WebSocket updates    |       ✅        |        ❌         |    Sometimes      |
| Send emails (DKIM signed)      |       ✅        |        ❌         |        ✅         |
| Multiple domains               |       ✅        |    Limited        |        ✅         |
| REST API + API Keys            |       ✅        |    Limited        |        ✅         |
| Self-hosted, full control      |       ✅        |        ❌         |        ❌         |
| Webhooks                       |       ✅        |        ❌         |        ✅         |
| Analytics dashboard            |       ✅        |        ❌         |        ✅         |
| Open source                    |       ✅        |        ❌         |        ❌         |
| Dark cyberpunk UI 😎           |       ✅        |        ❌         |        ❌         |
| Cost                           |    **$0**       |   Free/Limited    |   $10-$100/mo    |

---

## 🧠 Features

### 📬 Email Management
- 🎯 **Instant email creation** — Random or custom addresses across multiple domains
- 📥 **Real-time inbox** — WebSocket-powered live updates (no polling!)
- 📤 **Outbound email** — Send DKIM-signed emails from your temp addresses
- 🔍 **Full-text search** — Search through all your emails
- ⭐ **Star & label** — Organize important emails with custom labels
- 📎 **Attachments** — Full attachment support with secure storage
- 🗑️ **Bulk operations** — Select and delete/mark-read multiple emails
- 📧 **Email forwarding** — Forward incoming mail to your real address
- 🤖 **Auto-reply** — Set up vacation responders per email address

### 🔐 Authentication & Security
- 🎫 **Token-based auth** — 40-character tokens, no passwords needed
- 🔑 **Multiple API Keys** — Generate multiple keys with different scopes
- 🛡️ **Rate limiting** — Built-in protection against abuse
- 📊 **Usage tracking** — Monitor your daily API usage (200,000 calls/day default)
- 🔒 **IP whitelisting** — Restrict API keys to specific IPs
- 🔐 **2FA Support** — Optional TOTP two-factor authentication

### 📊 Analytics & Monitoring
- 📈 **Usage charts** — Visualize API calls over time (hourly/daily/weekly)
- 🎯 **Endpoint analytics** — See which endpoints are most used
- ❌ **Error tracking** — Monitor and debug failed requests
- 🔄 **Real-time updates** — Live dashboard metrics via WebSocket
- 🌍 **Geo tracking** — See where your API calls originate

### 🔗 Webhooks & Integrations
- 🪝 **Webhook support** — Get notified when emails arrive
- 🔏 **HMAC signatures** — Secure webhook payloads with X-Signature header
- 📄 **OpenAPI spec** — Full OpenAPI 3.0 documentation
- 🔌 **Multiple API keys** — Create keys with different permissions
- 📥 **Export options** — Download emails as .eml or .zip

### 🎨 Beautiful UI
- 🌑 **Dark theme default** — Easy on the eyes, cyberpunk aesthetic
- ☀️ **Light theme** — Toggle with system preference detection
- ⚡ **Fast & responsive** — React-powered SPA with Vite
- 📱 **Mobile-friendly** — Fully responsive design
- ✨ **Animations** — Smooth Framer Motion transitions
- ⌨️ **Keyboard shortcuts** — Power user navigation (r=refresh, c=create, /=search)
- 🎯 **Command palette** — Quick actions with Cmd+K / Ctrl+K

---

## 🏗️ Architecture

```
                                    ┌─────────────────────────────┐
                                    │    React Dashboard (Vite)   │
                                    │   • Real-time inbox         │
                                    │   • Analytics charts        │
                                    │   • Dark cyberpunk UI       │
                                    └──────────────┬──────────────┘
                                                   │ REST + WebSocket
                                                   │
┌──────────────────┐              ┌────────────────▼────────────────┐
│   SMTP Server    │              │      Express.js Backend         │
│   (Port 2525)    │◄────────────►│   • JWT + API Key auth          │
│   • Receive mail │   Internal   │   • Token management            │
│   • Parse MIME   │              │   • WebSocket broadcaster       │
│   • Store to DB  │              │   • DKIM signing                │
└──────────────────┘              └────────────────┬────────────────┘
                                                   │
                                  ┌────────────────▼────────────────┐
                                  │         PostgreSQL              │
                                  │   • tokens, emails, messages    │
                                  │   • api_logs, webhooks          │
                                  │   • Full-text search indexes    │
                                  └────────────────┬────────────────┘
                                                   │
                                  ┌────────────────▼────────────────┐
                                  │            Redis                │
                                  │   • Session cache               │
                                  │   • Rate limiting               │
                                  │   • Real-time pub/sub           │
                                  └─────────────────────────────────┘
```

---

## 📦 Quick Start

### Prerequisites

- **VPS/Server** with public IP (Ubuntu 20.04+ recommended)
- **Node.js** 18+ 
- **PostgreSQL** 14+
- **Redis** 6+
- **Domain** with DNS access (for MX records)
- **Nginx** (reverse proxy + SSL)

### 1. Clone the repository

```bash
git clone https://github.com/vikrant-project/tempmail-pro.git
cd tempmail-pro
```

### 2. Install dependencies

```bash
# System packages
sudo apt update
sudo apt install -y nodejs npm postgresql redis-server nginx certbot python3-certbot-nginx

# Enable services
sudo systemctl enable --now postgresql redis-server nginx
```

### 3. Configure PostgreSQL

```bash
# Create database and user
sudo -u postgres psql << EOF
CREATE USER mailtemp WITH PASSWORD 'YourSecurePassword123!';
CREATE DATABASE mailtemp_db OWNER mailtemp;
GRANT ALL PRIVILEGES ON DATABASE mailtemp_db TO mailtemp;
EOF
```

### 4. Configure environment

```bash
# Backend configuration
cp backend/.env.example backend/.env
nano backend/.env

# Frontend configuration  
cp frontend/.env.example frontend/.env
nano frontend/.env
```

**Backend .env:**
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mailtemp_db
DB_USER=mailtemp
DB_PASSWORD=YourSecurePassword123!
REDIS_HOST=localhost
REDIS_PORT=6379
SMTP_PORT=2525
DAILY_TOKEN_LIMIT=200000
EMAIL_RETENTION_DAYS=1
DOMAIN=yourdomain.com
SUBDOMAINS=temp,mail,inbox
```

**Frontend .env:**
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### 5. Generate DKIM keys

```bash
mkdir -p dkim
openssl genrsa -out dkim/private.key 2048
openssl rsa -in dkim/private.key -pubout -out dkim/public.key

# Get the public key for DNS TXT record (remove headers and newlines)
echo "Add this to DNS as TXT record for default._domainkey.yourdomain.com:"
cat dkim/public.key | grep -v "PUBLIC KEY" | tr -d "\n"
```

### 6. Run database migrations

```bash
cd backend
npm install
node migrate.js
```

### 7. Build frontend

```bash
cd ../frontend
npm install -g yarn
yarn install
yarn build
```

### 8. Start services with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start API server (clustered for performance)
pm2 start ecosystem.config.js

# Start SMTP server
pm2 start backend/smtp-server.js --name mailtemp-smtp

# Save and setup startup script
pm2 save
pm2 startup
```

### 9. Configure SMTP port forwarding

```bash
# Redirect port 25 to 2525 (allows running without root)
sudo iptables -t nat -A PREROUTING -p tcp --dport 25 -j REDIRECT --to-port 2525
sudo iptables-save > /etc/iptables.rules

# Make persistent
echo 'iptables-restore < /etc/iptables.rules' | sudo tee /etc/rc.local
sudo chmod +x /etc/rc.local
```

---

## 🌐 DNS Configuration

### Required DNS Records

Replace `yourdomain.com` and `YOUR_SERVER_IP` with your actual values.

| Type | Name | Value | Proxy | Notes |
|------|------|-------|-------|-------|
| A | temp | YOUR_SERVER_IP | On (if Cloudflare) | Main UI subdomain |
| A | mail.temp | YOUR_SERVER_IP | **Off (DNS only)** | MX target - MUST be gray cloud! |
| A | api | YOUR_SERVER_IP | On (if Cloudflare) | API subdomain |
| MX | temp | mail.temp.yourdomain.com | - | Priority 10 |
| TXT | temp | `v=spf1 ip4:YOUR_SERVER_IP ~all` | - | SPF record |
| TXT | _dmarc.temp | `v=DMARC1; p=none; rua=mailto:admin@yourdomain.com` | - | DMARC |
| TXT | default._domainkey | `v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY` | - | DKIM |

### Adding More Subdomains

To add additional domains (e.g., `inbox.yourdomain.com`, `mail.yourdomain.com`):

1. Add A records for the subdomain and `mail.subdomain`
2. Add MX record pointing to `mail.subdomain.yourdomain.com`
3. Add SPF, DKIM, DMARC TXT records for the subdomain
4. Update `SUBDOMAINS` in backend `.env`
5. Restart the backend: `pm2 reload mailtemp-api`

### Cloudflare Setup (if using)

⚠️ **Critical**: MX target records MUST be **DNS only (gray cloud)** for email to work!

| Subdomain | Proxy Status | Reason |
|-----------|--------------|--------|
| temp | Proxied (orange) ✅ | Frontend UI |
| api | Proxied (orange) ✅ | Backend API |
| mail.temp | DNS only (gray) ⚠️ | MX target - SMTP needs direct IP |

---

## 🔧 Nginx Configuration

Create `/etc/nginx/sites-available/tempmail`:

```nginx
# API Backend
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_read_timeout 86400;
    }
}

# Frontend UI
server {
    listen 443 ssl http2;
    server_name temp.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/temp.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/temp.yourdomain.com/privkey.pem;
    
    root /home/ubuntu/tempmail-pro/frontend/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name temp.yourdomain.com api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

Enable the site and get SSL certificates:

```bash
sudo ln -s /etc/nginx/sites-available/tempmail /etc/nginx/sites-enabled/
sudo nginx -t
sudo certbot --nginx -d api.yourdomain.com -d temp.yourdomain.com --non-interactive --agree-tos --email admin@yourdomain.com
sudo systemctl reload nginx
```

---

## 📡 API Reference

### Authentication

**Option 1: Bearer Token (Session-based)**
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     https://api.yourdomain.com/api/v1/email/list
```

**Option 2: API Key**
```bash
curl -H "X-API-Key: mtak_your_api_key_here" \
     https://api.yourdomain.com/api/v1/email/list
```

### API Endpoints

#### Authentication (Free, no token cost)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/signup` | Generate new 40-char token |
| POST | `/api/v1/auth/login` | Login with token, get JWT |

#### Email Management

| Method | Endpoint | Tokens | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/email/create` | 5 | Create temp email address |
| GET | `/api/v1/email/list` | 0 | List all your email addresses |
| DELETE | `/api/v1/email/:id` | 2 | Delete an email address |

#### Messages

| Method | Endpoint | Tokens | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/email/:id/messages` | 1 | Get inbox (list view) |
| GET | `/api/v1/email/:id/messages/:msgId` | 1 | Get full message |
| PATCH | `/api/v1/email/:id/messages/:msgId/read` | 0 | Mark read/unread |

#### Outbound Email

| Method | Endpoint | Tokens | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/mail/send` | 5 | Send DKIM-signed email |

#### API Keys

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/keys` | List your API keys |
| POST | `/api/v1/keys/create` | Create new API key |
| DELETE | `/api/v1/keys/:id` | Revoke an API key |
| POST | `/api/v1/keys/:id/rotate` | Rotate key secret |

#### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/analytics/usage` | Usage statistics |
| GET | `/api/v1/analytics/endpoints` | Top endpoints |
| GET | `/api/v1/analytics/errors` | Error breakdown |

#### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/webhooks` | List webhooks |
| POST | `/api/v1/webhooks` | Create webhook |
| DELETE | `/api/v1/webhooks/:id` | Delete webhook |
| POST | `/api/v1/webhooks/:id/test` | Test webhook |

#### Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/docs/endpoints` | API catalog (public) |
| GET | `/api/v1/docs/openapi.json` | OpenAPI 3.0 spec |

### Code Examples

#### cURL

```bash
# Create a token
TOKEN=$(curl -s -X POST https://api.yourdomain.com/api/v1/auth/signup | jq -r '.token')
echo "Your token: $TOKEN"

# Login and get JWT
JWT=$(curl -s -X POST https://api.yourdomain.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"token\":\"$TOKEN\"}" | jq -r '.session_token')

# Create an email address
curl -X POST https://api.yourdomain.com/api/v1/email/create \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"type":"random","subdomain":"temp"}'

# List emails
curl https://api.yourdomain.com/api/v1/email/list \
  -H "Authorization: Bearer $JWT"

# Send an email
curl -X POST https://api.yourdomain.com/api/v1/mail/send \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"emailId":1,"to":"recipient@example.com","subject":"Hello","body":"Test message"}'
```

#### JavaScript (fetch)

```javascript
const API_URL = 'https://api.yourdomain.com/api/v1';

// Create token
const signupRes = await fetch(`${API_URL}/auth/signup`, { method: 'POST' });
const { token } = await signupRes.json();

// Login
const loginRes = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token })
});
const { session_token } = await loginRes.json();

// Create email
const emailRes = await fetch(`${API_URL}/email/create`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session_token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ type: 'random', subdomain: 'temp' })
});
const { email } = await emailRes.json();
console.log(`Your temp email: ${email.address}`);
```

#### Python

```python
import requests

API_URL = 'https://api.yourdomain.com/api/v1'

# Create token
token = requests.post(f'{API_URL}/auth/signup').json()['token']

# Login
session = requests.post(f'{API_URL}/auth/login', json={'token': token}).json()
jwt = session['session_token']

# Create email
headers = {'Authorization': f'Bearer {jwt}'}
email = requests.post(
    f'{API_URL}/email/create',
    headers=headers,
    json={'type': 'random', 'subdomain': 'temp'}
).json()['email']

print(f"Your temp email: {email['address']}")

# Check inbox
messages = requests.get(
    f'{API_URL}/email/{email["id"]}/messages',
    headers=headers
).json()
```

#### Go

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

const apiURL = "https://api.yourdomain.com/api/v1"

func main() {
    // Create token
    resp, _ := http.Post(apiURL+"/auth/signup", "application/json", nil)
    var signup map[string]string
    json.NewDecoder(resp.Body).Decode(&signup)
    token := signup["token"]

    // Login
    body, _ := json.Marshal(map[string]string{"token": token})
    resp, _ = http.Post(apiURL+"/auth/login", "application/json", bytes.NewBuffer(body))
    var login map[string]string
    json.NewDecoder(resp.Body).Decode(&login)
    jwt := login["session_token"]

    fmt.Printf("JWT: %s\n", jwt)
}
```

---

## 🧪 Testing

### Test SMTP Receiving

```bash
# Install swaks (Swiss Army Knife for SMTP)
sudo apt install swaks

# Send test email
swaks --to test123@temp.yourdomain.com \
      --from sender@example.com \
      --server mail.temp.yourdomain.com \
      --port 25 \
      --header "Subject: Test Email" \
      --body "This is a test message"
```

### Verify Email Authentication

```bash
# Check SPF record
dig TXT temp.yourdomain.com +short

# Check DKIM record
dig TXT default._domainkey.yourdomain.com +short

# Check DMARC record
dig TXT _dmarc.temp.yourdomain.com +short

# Full email authentication check
# Send email from your temp address to a Gmail account
# In Gmail, click "Show original" to see authentication results
# Look for: SPF=PASS, DKIM=PASS, DMARC=PASS
```

### API Health Check

```bash
curl https://api.yourdomain.com/api/v1/health
# Expected: {"status":"ok","timestamp":"..."}
```

---

## 🛠️ Maintenance

### Logs

```bash
# View PM2 logs
pm2 logs mailtemp-api
pm2 logs mailtemp-smtp

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Backups

```bash
# Backup database
pg_dump -U mailtemp mailtemp_db > backup_$(date +%Y%m%d).sql

# Automated daily backup (add to crontab)
0 2 * * * pg_dump -U mailtemp mailtemp_db | gzip > /home/ubuntu/backups/db_$(date +\%Y\%m\%d).sql.gz
```

### Updates

```bash
cd /home/ubuntu/tempmail-pro
git pull origin main

# Backend
cd backend && npm install
pm2 reload mailtemp-api

# Frontend
cd ../frontend && yarn install && yarn build
```

### Cleanup (Expired Emails)

The system automatically cleans up expired emails. To manually trigger:

```bash
# Run cleanup
curl -X POST https://api.yourdomain.com/api/v1/admin/cleanup \
  -H "Authorization: Bearer ADMIN_JWT"
```

---

## 🔧 Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend** | Node.js 20, Express.js 4.x, Socket.IO |
| **Frontend** | React 18, Vite 5, TailwindCSS, Framer Motion |
| **Database** | PostgreSQL 14+ with full-text search |
| **Cache** | Redis 6+ |
| **Email** | smtp-server, nodemailer, mailparser |
| **Process Manager** | PM2 (cluster mode) |
| **Web Server** | Nginx (reverse proxy + SSL) |
| **SSL** | Let's Encrypt (certbot) |
| **DNS/CDN** | Cloudflare (optional) |

---

## 📁 Project Structure

```
tempmail-pro/
├── backend/
│   ├── server.js          # Main Express app
│   ├── smtp-server.js     # SMTP receiver (port 2525)
│   ├── api-v2.js          # API v2 routes
│   ├── api-extra.js       # Additional API endpoints
│   ├── migrate.js         # Database migrations
│   ├── migrations/        # SQL migration files
│   └── .env.example       # Environment template
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React app
│   │   ├── App.css        # Styles (dark theme)
│   │   ├── AnalyticsPage.jsx
│   │   └── components/    # Reusable components
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
├── dkim/
│   ├── private.key        # DKIM private key (generate this)
│   └── public.key         # DKIM public key (for DNS)
├── docs/
│   └── screenshots/       # Documentation images
├── ecosystem.config.js    # PM2 configuration
├── LICENSE                # MIT License
└── README.md              # This file
```

---

## 🛡️ Security Considerations

### Built-in Security

- ✅ **JWT tokens** with configurable expiration
- ✅ **Rate limiting** (1000 req/min default, configurable)
- ✅ **API key scopes** — limit what each key can do
- ✅ **IP whitelisting** — restrict API keys to specific IPs
- ✅ **CORS** configured for specific domains only
- ✅ **Helmet.js** security headers
- ✅ **Input validation** on all endpoints
- ✅ **HMAC signatures** on webhook payloads

### Recommendations

1. **Use strong secrets** — Generate random JWT_SECRET (64+ chars)
2. **Enable 2FA** — For admin accounts
3. **Regular backups** — Automated daily database backups
4. **Monitor logs** — Watch for suspicious activity
5. **Keep updated** — Regular security updates

### Outbound Email Deliverability

Direct SMTP from VPS IPs often gets flagged. For better deliverability:

1. **Use SMTP relay** (SendGrid, Mailgun, Amazon SES)
2. **Warm up IP** gradually over weeks
3. **Proper PTR record** — Reverse DNS must match server hostname
4. **Monitor blacklists** — Check MXToolbox regularly
5. **Low volume** — Don't send bulk from temp mail service

---

## 🐛 Troubleshooting

### SMTP not receiving emails

1. Check MX record is pointing to correct hostname
2. Ensure mail.* subdomain is **DNS only (gray cloud)** if using Cloudflare
3. Check port 25 is open: `nc -zv mail.temp.yourdomain.com 25`
4. Check SMTP logs: `pm2 logs mailtemp-smtp`

### CORS errors

1. Verify `CORS_ORIGINS` in backend `.env` includes your frontend domain
2. Check nginx isn't adding duplicate CORS headers
3. Ensure API subdomain SSL certificate is valid

### WebSocket not connecting

1. Verify nginx proxy settings include WebSocket headers
2. Check `proxy_read_timeout` is high enough (86400)
3. Verify Socket.IO origins include your domain

### Emails going to spam

1. Check SPF, DKIM, DMARC records are correct
2. Verify DKIM signature in sent emails
3. Check IP reputation on MXToolbox
4. Consider using SMTP relay service

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Areas for Contribution

- 🔌 **SMTP relay integration** (SendGrid, Mailgun, SES)
- 📊 **More analytics visualizations**
- 📱 **Mobile app** (React Native)
- 🌍 **Internationalization** (i18n)
- 🧪 **Test coverage** (Jest, Playwright)
- 📚 **Documentation improvements**
- 🐛 **Bug fixes**

### How to Contribute

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/tempmail-pro.git
cd tempmail-pro

# Install dependencies
cd backend && npm install
cd ../frontend && yarn install

# Start development servers
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && yarn dev
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [smtp-server](https://github.com/nodemailer/smtp-server) — SMTP server for Node.js
- [nodemailer](https://github.com/nodemailer/nodemailer) — Email sending
- [mailparser](https://github.com/nodemailer/mailparser) — Email parsing
- [Socket.IO](https://socket.io/) — Real-time communication
- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — Build tool
- [TailwindCSS](https://tailwindcss.com/) — Styling
- [Framer Motion](https://www.framer.com/motion/) — Animations

---

## 🌟 Star History

If this project helped you, please give it a ⭐ — it helps others discover it!

[![Star History Chart](https://api.star-history.com/svg?repos=vikrant-project/tempmail-pro&type=Date)](https://star-history.com/#vikrant-project/tempmail-pro&Date)

---

<p align="center">
  <b>Privacy is not optional, it's a right.</b>
</p>

<p align="center">
  Built with ☕ caffeine, 🌑 dark mode, and a passion for privacy.
</p>

<p align="center">
  <a href="https://github.com/vikrant-project/tempmail-pro/issues">Report Bug</a>
  ·
  <a href="https://github.com/vikrant-project/tempmail-pro/issues">Request Feature</a>
  ·
  <a href="https://github.com/vikrant-project/tempmail-pro/discussions">Discussions</a>
</p>
