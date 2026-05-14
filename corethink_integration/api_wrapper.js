
/**
 * CoreThink API Wrapper for Highlight AI
 * Generated: 2026-01-14T01:05:20.130Z
 */

const express = require('express');
const CoreThinkIntegration = require('./corethink_highlight_integration');

const app = express();
app.use(express.json());

const corethink = new CoreThinkIntegration();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        model: corethink.modelId,
        timestamp: new Date().toISOString()
    });
});

// Chat completions endpoint
app.post('/v1/chat/completions', async (req, res) => {
    try {
        const { messages, temperature, max_tokens, ...options } = req.body;
        
        // Validate request
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({
                error: 'Invalid messages format'
            });
        }
        
        // Process with CoreThink model
        const response = await corethink.processChatCompletion({
            messages,
            temperature: temperature || corethink.config.temperature,
            max_tokens: max_tokens || corethink.config.max_new_tokens,
            ...options
        });
        
        res.json(response);
    } catch (error) {
        console.error('Chat completion error:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

// Model info endpoint
app.get('/v1/models', (req, res) => {
    res.json({
        data: [corethink.createHighlightModelConfig()]
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CoreThink API server running on port ${PORT}`);
});

module.exports = app;
