# EC2 Setup Guide — Blog

Steps to set up the blog on a fresh EC2 Ubuntu instance.

## 1. Install dependencies

```bash
sudo apt update && sudo apt install -y unzip nginx
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

## 2. Create folder structure

```bash
mkdir -p ~/blog
```

## 3. Place deploy script

```bash
cp deploy/deploy.sh ~/blog/deploy.sh
chmod +x ~/blog/deploy.sh
```

## 4. Set up nginx

```bash
sudo cp deploy/nginx-blog.shubnit.com.conf /etc/nginx/sites-available/blog.shubnit.com
sudo ln -s /etc/nginx/sites-available/blog.shubnit.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 5. SSL certificate

Check if `blog.shubnit.com` is already on your cert:
```bash
sudo certbot certificates
```

If not:
```bash
sudo certbot --nginx -d blog.shubnit.com
```

## 6. Run first deploy

```bash
~/blog/deploy.sh
```

This downloads the latest release (React build + Express server), extracts it, and starts the app with pm2 on port 3000.

## 7. Set up pm2 auto-start on reboot

```bash
pm2 startup
```

Copy and run the command it prints, then:
```bash
pm2 save
```

## 8. Set up cron job

```bash
crontab -e
```

Add:
```
*/5 * * * * /home/ubuntu/blog/deploy.sh >> /home/ubuntu/blog/deploy.log 2>&1
```

## 9. Set up logrotate

```bash
sudo cp deploy/logrotate-blog /etc/logrotate.d/blog
```

## 10. Verify

```bash
curl https://blog.shubnit.com
# Expected: HTML response

pm2 list
# Expected: blog online
```
