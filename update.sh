while true
do
    python3.7 main.py > js/curr.js
    git add .
    git commit -m 'auto currency upd'
    git push
    sleep 7200
done
