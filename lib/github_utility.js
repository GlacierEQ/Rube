/**
 * 🐙 RUBE GITHUB UTILITY
 *
 * Specialized helper for managing GitHub repositories,
 * issues, and pull requests directly from Rube.
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class GitHubUtility {
    constructor() {
        this.ghAuthenticated = false;
    }

    /**
     * Check if GitHub CLI is installed and authenticated
     */
    async checkAuth() {
        try {
            const { stdout } = await execAsync('gh auth status');
            this.ghAuthenticated = stdout.includes('Logged in');
            return this.ghAuthenticated;
        } catch (error) {
            return false;
        }
    }

    /**
     * Create a new repository
     */
    async createRepo(name, description, isPublic = false) {
        const visibility = isPublic ? '--public' : '--private';
        const command = `gh repo create ${name} ${visibility} --description "${description}" --source=. --remote=origin --push`;

        try {
            const { stdout } = await execAsync(command);
            return { success: true, output: stdout };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Get issues for current repo
     */
    async listIssues(limit = 10) {
        try {
            const { stdout } = await execAsync(`gh issue list --limit ${limit} --json number,title,state,updatedAt`);
            return JSON.parse(stdout);
        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Get PR status
     */
    async prStatus() {
        try {
            const { stdout } = await execAsync('gh pr status --json number,title,state,mergeable');
            return JSON.parse(stdout);
        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Run a full sync (commit, pull, push)
     */
    async fullSync(message = 'Rube Auto-Sync') {
        try {
            await execAsync('git add .');
            await execAsync(`git commit -m "${message}" || echo "No changes to commit"`);
            await execAsync('git pull --rebase origin main || git pull --rebase origin master');
            const { stdout } = await execAsync('git push origin main || git push origin master');
            return { success: true, output: stdout };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

module.exports = GitHubUtility;
