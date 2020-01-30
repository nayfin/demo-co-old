#!/bin/bash
# exit when error
set -e
# get the first argument as the package name and set it to a variable
package=$1

# TODO: @Kyle, learn how to make this not terrible and ugly
# If this isn't a valid package, print error and exit
if [ "$package" != "form-fields" ]
then
  echo "Not a valid package to release, try 'interact', 'crispr-forms', or 'form-validation-handler'"
  exit 1
fi
# check we are on master, exit if not
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "master" ]
then
  echo "Not on master branch, exiting"
  exit 1
fi
# get current version of package being released
actual_version=$(grep version "libs/$package/package.json")
# print it to screen for user
echo " ${actual_version}"

# holds variable update types to check against user input
update_options=(major minor patch)
# ask user how they want to increment version
echo "What type of update is this?"
echo "options: ${update_options[*]}"
# set update_type to user's response
read update_type
# TODO: properly check against update_options array instead of limping through this if statement
if [ "$update_type" != "patch" ] && [ "$update_type" != "minor" ] && [ "$update_type" != "major" ]
then
  echo "Not a valid semantic update, try 'patch', 'minor', or 'major'"
  exit 1
fi

# go into the library, bump the version according to update type then return to root
cd "libs/$package" && npm version "${update_type}" && cd ../../
#  build the library and prepare to publish
ng build $package
# package the build code in dist and publish it then go back to root
# TODO: is `npm pack` still needed??
cd "dist/libs/$package" && npm pack && npm publish --access public && cd ../../../

# get the new version from the library's package.json
release_version=$(grep version "libs/$package/package.json")
# stage, commit and push all changes
git add . && git commit -m "release: $release_version" && git push

# UNCOMMENT BELOW IF YOU SET UP DOCUMENTATION SYSTEM
# npm run release:documentation