#!/bin/bash
echo 'power-wash.sh ---- start'
echo ''

rm -rf ./dist
rm -rf ./node_modules
rm -rf ./package-lock.json

ls -la ./dist
ls -la ./node_modules
ls -la ./package-lock.json

echo ''
echo 'power-wash.sh ---- done'
echo ''
