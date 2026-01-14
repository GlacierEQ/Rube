#!/bin/bash
# CoreThink Highlight AI Deployment Script
# Generated: 2026-01-14T01:05:20.249Z

set -e

echo "🚀 Deploying CoreThink Integration for Highlight AI..."

# Check dependencies
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Set environment variables
export CORETHINK_ENCRYPTION_KEY=$(openssl rand -hex 32)
export HIGHLIGHT_AI_ACCESS_TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6InNzb19vaWRjX2tleV9wYWlyXzAxSk5LTThUVlBEQjRCRjhOSlQ5WFBNUTM1In0.eyJpc3MiOiJodHRwczovL2F1dGgtYXBpLmhpZ2hsaWdodGFpLmNvbSIsInN1YiI6InVzZXJfMDFKVkI2NTBDWlpEMDZaMlkzTVREOU43NTgiLCJzaWQiOiJzZXNzaW9uXzAxS0RWQlJCWVhBTjdDMzExV05RSE44V1ZYIiwianRpIjoiMDFLRVgwNVo3RFdQRFo4OVBGTVhFVkVWNVciLCJvcmdfaWQiOiJvcmdfMDFKUkI4M0tGTldIQURWWlMwQlozS1kxRUYiLCJyb2xlIjoibWVtYmVyIiwicm9sZXMiOlsibWVtYmVyIl0sInBlcm1pc3Npb25zIjpbXSwiZXhwIjoxNzY4MzUyNjE2LCJpYXQiOjE3NjgzNTIzMTZ9.ota8rlRB0GVxezyzg3Zi7XyRROmcVBIMqIlZCaOoemqHL0k4oQIx8E95p8sGI9tB_ou-WZa7AmhgGoftko7vohj60WknVqY9eIhxRgtCcsd7_oJz63R3pdH-qcRW5SeqGLV4ly02fiIL9pmNjrdKRTEWmNSZ5s3oBYcFG8Yj1PWLUXDTcMpr2AKz0qMjbH-bo9S2_ATULTox-kbN2cz8cjpoemPn7N_1DgIwRAlclD5gdOKN2GO0se_g_ZK0cvbwUJnWkqkDMHrFSsYGLW69iffzSD07eo4zebgG2kSMNn1gY4h4HPzpsGyeJeDir6MP9G0WQJVDPUfpRo2nGXEEjQv

# Start the service
echo "🔄 Starting CoreThink API service..."
npm start

echo "✅ CoreThink integration deployed successfully!"
echo "📍 API available at: http://localhost:3000"
echo "🔍 Health check: http://localhost:3000/health"
echo "📊 Model info: http://localhost:3000/v1/models"
