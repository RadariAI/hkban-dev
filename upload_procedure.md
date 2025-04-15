# Log into the Droplet
ssh -i "C:\Users\Radari AI\.ssh\hkban-ssh" root@178.128.56.132

# passkey: radari-ai

# --- Inside the SSH session (run these on the Droplet) ---

# Delete all files on the server
rm -rf /var/www/html/* && find /var/www/html -mindepth 1 -exec rm -rf {} +

# Verify (optional)
ls -la /var/www/html

# Exit the SSH session (type this when ready to upload files)
exit

# --- Back in PowerShell (run these locally) ---

# Upload specific files and folders

scp -i "C:\Users\Radari AI\.ssh\hkban-ssh" -r "board-of-directors.html" "contact-us.html" "disclaimer.html" "importance-of-venture-and-angel-investments.html" "index.html" "introduction.html" "membership.html" "personal-data-collection-statement.html" "privacy-policy-statement.html" "secretariat-and-patron.html" "strategic-partner-organizations.html" assets images js root@178.128.56.132:/var/www/html/

# Log back into the Droplet (optional, for permissions or further config)
ssh -i "C:\Users\Radari AI\.ssh\hkban-ssh" root@178.128.56.132

# --- Inside the SSH session again (run these on the Droplet) ---

# Fix permissions
chown -R www-data:www-data /var/www/html