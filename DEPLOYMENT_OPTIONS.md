# Deployment Options - Maru AI Academy

This guide shows you how to deploy the application to various cloud platforms. The codebase is designed to be platform-agnostic and can run on any modern cloud provider.

---

## 🎯 Quick Comparison

| Platform | Setup Time | Monthly Cost | Complexity | Auto-Scale | Recommended For |
|----------|-----------|--------------|------------|------------|-----------------|
| **Vercel** | 5 min | $0-20 | ⭐ Easy | ✅ Yes | MVPs, fast iteration |
| **Google Cloud Run** | 30 min | $20-50 | ⭐⭐ Medium | ✅ Yes | Production, flexibility |
| **Azure App Service** | 45 min | $25-55 | ⭐⭐⭐ Complex | ✅ Yes | Enterprise, Microsoft stack |
| **AWS Amplify** | 30 min | $15-40 | ⭐⭐ Medium | ✅ Yes | AWS ecosystem |
| **Railway** | 10 min | $10-30 | ⭐ Easy | ✅ Yes | Simple projects |
| **Render** | 10 min | $10-30 | ⭐ Easy | ✅ Yes | Heroku alternative |

---

## 🟢 Option 1: Vercel (Current - Fastest)

### **Pros**
- ✅ Zero configuration
- ✅ Automatic deployments on git push
- ✅ Global edge network
- ✅ Preview deployments for PRs
- ✅ Built-in analytics
- ✅ Free tier generous

### **Cons**
- ❌ Vendor lock-in
- ❌ Serverless functions have 10s timeout (hobby plan)
- ❌ Less control over infrastructure

### **Deployment Steps**

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Add Environment Variables** (in Vercel Dashboard):
   ```
   DATABASE_URL=your_neon_url
   NEXTAUTH_SECRET=generate_with_openssl_rand
   NEXTAUTH_URL=https://your-app.vercel.app
   GEMINI_API_KEY=your_gemini_key
   STRIPE_SECRET_KEY=your_stripe_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   RESEND_API_KEY=your_resend_key
   ```

4. **Custom Domain** (optional):
   - Go to Project Settings → Domains
   - Add your domain (e.g., academy.maruonline.com)
   - Update DNS records as instructed

**Cost**: $0/month (Hobby plan) or $20/month (Pro plan)

---

## 🔵 Option 2: Google Cloud Run

### **Pros**
- ✅ Pay-per-use pricing
- ✅ Scales to zero (no idle cost)
- ✅ Full Docker control
- ✅ No timeout limits
- ✅ Integrated with GCP services

### **Cons**
- ❌ Requires Docker knowledge
- ❌ More setup than Vercel
- ❌ Cold starts (for low-traffic apps)

### **Prerequisites**
- Google Cloud Project created
- `gcloud` CLI installed
- Billing enabled

### **Deployment Steps**

1. **Install Google Cloud CLI**:
   ```bash
   # macOS
   brew install --cask google-cloud-sdk
   
   # Initialize
   gcloud init
   gcloud auth login
   ```

2. **Set Project**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Enable Required APIs**:
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable artifactregistry.googleapis.com
   ```

4. **Update `next.config.js`** for standalone output:
   ```javascript
   module.exports = {
     output: 'standalone',
     // ... rest of config
   }
   ```

5. **Deploy**:
   ```bash
   # Deploy directly from source (Cloud Build handles containerization)
   gcloud run deploy maru-academy \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --memory 512Mi \
     --set-env-vars="NODE_ENV=production" \
     --set-secrets="DATABASE_URL=DATABASE_URL:latest,NEXTAUTH_SECRET=NEXTAUTH_SECRET:latest"
   ```

6. **Set Environment Variables via Secret Manager**:
   ```bash
   # Create secrets
   echo -n "your_database_url" | gcloud secrets create DATABASE_URL --data-file=-
   echo -n "your_nextauth_secret" | gcloud secrets create NEXTAUTH_SECRET --data-file=-
   
   # Grant Cloud Run access to secrets
   gcloud secrets add-iam-policy-binding DATABASE_URL \
     --member=serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com \
     --role=roles/secretmanager.secretAccessor
   ```

7. **Custom Domain**:
   ```bash
   gcloud run domain-mappings create \
     --service maru-academy \
     --domain academy.maruonline.com \
     --region us-central1
   ```

**Cost**: ~$20-50/month (pay-per-use, scales to zero)

---

## 🟦 Option 3: Azure App Service

### **Pros**
- ✅ Microsoft ecosystem integration
- ✅ Enterprise-grade features
- ✅ Good for .NET/Microsoft shops
- ✅ Integrated CI/CD

### **Cons**
- ❌ More expensive
- ❌ Complex pricing
- ❌ Heavier than Cloud Run

### **Prerequisites**
- Azure subscription
- Azure CLI installed

### **Deployment Steps**

1. **Install Azure CLI**:
   ```bash
   # macOS
   brew install azure-cli
   
   # Login
   az login
   ```

2. **Create Resource Group**:
   ```bash
   az group create \
     --name maru-academy-rg \
     --location eastus
   ```

3. **Create App Service Plan**:
   ```bash
   az appservice plan create \
     --name maru-academy-plan \
     --resource-group maru-academy-rg \
     --sku B1 \
     --is-linux
   ```

4. **Create Web App**:
   ```bash
   az webapp create \
     --name maru-academy \
     --resource-group maru-academy-rg \
     --plan maru-academy-plan \
     --runtime "NODE|18-lts"
   ```

5. **Deploy from GitHub**:
   ```bash
   # Configure deployment source
   az webapp deployment source config \
     --name maru-academy \
     --resource-group maru-academy-rg \
     --repo-url https://github.com/your-repo \
     --branch main \
     --manual-integration
   ```

6. **Set Environment Variables**:
   ```bash
   az webapp config appsettings set \
     --name maru-academy \
     --resource-group maru-academy-rg \
     --settings \
       DATABASE_URL="your_url" \
       NEXTAUTH_SECRET="your_secret" \
       NODE_ENV="production"
   ```

**Cost**: ~$25-55/month (B1/B2 tier)

---

## 🟠 Option 4: AWS Amplify

### **Pros**
- ✅ Integrated with AWS ecosystem
- ✅ Good CI/CD
- ✅ Global CDN
- ✅ Generous free tier

### **Cons**
- ❌ AWS complexity
- ❌ Learning curve for AWS-specific features

### **Deployment Steps**

1. **Install AWS CLI**:
   ```bash
   brew install awscli
   aws configure
   ```

2. **Install Amplify CLI**:
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

3. **Initialize Amplify**:
   ```bash
   amplify init
   # Follow prompts
   ```

4. **Add Hosting**:
   ```bash
   amplify add hosting
   # Choose: Hosting with Amplify Console
   # Choose: Continuous deployment
   ```

5. **Publish**:
   ```bash
   amplify publish
   ```

6. **Or Deploy via AWS Console**:
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect GitHub repository
   - Amplify auto-detects Next.js
   - Add environment variables in console
   - Deploy

**Cost**: ~$15-40/month

---

## 🟣 Option 5: Railway

### **Pros**
- ✅ Very simple setup
- ✅ Affordable
- ✅ Good developer experience
- ✅ Built-in database options

### **Cons**
- ❌ Smaller platform
- ❌ Less mature than others
- ❌ Potential scaling limits

### **Deployment Steps**

1. **Go to Railway.app**:
   - Sign up with GitHub

2. **New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Railway auto-detects Next.js**:
   - No configuration needed
   - Automatically installs dependencies and builds

4. **Add Environment Variables**:
   - Go to project → Variables
   - Add all required env vars

5. **Deploy**:
   - Automatic on every push to main

**Cost**: $5/month (Starter) + usage-based pricing (~$10-30 total)

---

## 🟢 Option 6: Render

### **Pros**
- ✅ Heroku-like simplicity
- ✅ Free tier available
- ✅ Automatic SSL
- ✅ Good performance

### **Cons**
- ❌ Free tier spins down after inactivity
- ❌ Limited to certain regions

### **Deployment Steps**

1. **Go to Render.com**:
   - Sign up with GitHub

2. **New Web Service**:
   - Click "New +"
   - Select "Web Service"
   - Connect your repository

3. **Configure**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `Node`

4. **Add Environment Variables**:
   - In Render dashboard
   - Add all required variables

5. **Deploy**:
   - Click "Create Web Service"
   - Automatic deployments on push

**Cost**: $0 (Free tier) or $7/month (Starter)

---

## 🗄️ Database Options

### **Current: Neon PostgreSQL** (Recommended)
- ✅ Serverless PostgreSQL
- ✅ $0 for 0.5GB (enough for MVP)
- ✅ Auto-scaling
- ✅ Works with any platform
- ✅ Built-in connection pooling

**No migration needed if satisfied!**

### **Alternative: Platform-Specific**

#### **Vercel → Vercel Postgres**
```bash
# Powered by Neon anyway
vercel postgres create
```

#### **Google Cloud → Cloud SQL**
```bash
gcloud sql instances create maru-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

#### **Azure → Azure Database for PostgreSQL**
```bash
az postgres server create \
  --resource-group maru-academy-rg \
  --name maru-db \
  --sku-name B_Gen5_1
```

#### **AWS → RDS**
```bash
aws rds create-db-instance \
  --db-instance-identifier maru-db \
  --db-instance-class db.t3.micro \
  --engine postgres
```

---

## 🔐 Environment Variables Reference

All platforms require these:

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Authentication
NEXTAUTH_SECRET="generate_with: openssl rand -base64 32"
NEXTAUTH_URL="https://your-domain.com"

# AI
GEMINI_API_KEY="your_gemini_api_key"

# Payments (optional - when implementing Stripe)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (optional - when implementing)
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@yourdomain.com"

# Optional
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

---

## 🚀 Recommended Migration Path

### **Phase 1: MVP (Now)**
→ **Vercel** + Neon PostgreSQL
- Fastest to market
- Zero infrastructure overhead
- Focus on features, not DevOps

### **Phase 2: Growing (10K+ users)**
→ **Google Cloud Run** + Neon (or Cloud SQL)
- More control
- Better pricing at scale
- Docker flexibility

### **Phase 3: Enterprise (100K+ users)**
→ **Multi-cloud** or **Platform-specific optimization**
- Load balancing
- Multi-region
- Custom infrastructure

---

## 📊 Decision Matrix

**Choose Vercel if**:
- ✅ You want to launch ASAP
- ✅ You're a small team/solo founder
- ✅ You don't need custom server logic
- ✅ Monthly users <50K

**Choose Google Cloud Run if**:
- ✅ You need full control
- ✅ You want pay-per-use pricing
- ✅ You plan to use GCP services
- ✅ You're comfortable with Docker

**Choose Azure if**:
- ✅ You're in Microsoft ecosystem
- ✅ Enterprise customer base
- ✅ Need Azure AD integration
- ✅ C-suite mandates Microsoft

**Choose Railway/Render if**:
- ✅ You want simplicity of Heroku
- ✅ Budget-conscious
- ✅ Small-medium scale
- ✅ Don't need enterprise features

---

## 🎯 My Recommendation

**For Maru AI Academy right now**:

1. **Stay on Vercel** for the next 3-6 months
2. **Focus on building features** from BUILD_PLAN_UPDATED.md
3. **Keep the Docker setup ready** (we'll create it in Week 3)
4. **Re-evaluate when you hit**:
   - 10,000 monthly active users
   - $1,000/month in revenue
   - Need for GCP-specific services

**Why?** 
- You're already deployed and working
- Adding features > migrating infrastructure
- Can migrate anytime with Docker (it's a 1-day task)
- Vercel is perfect for this stage

---

## 📝 Next Steps

1. **Decide your platform** (recommend: stay on Vercel)
2. **Follow BUILD_PLAN_UPDATED.md** for feature development
3. **Revisit deployment** in 3 months or when needs change

**Last Updated**: December 19, 2024
