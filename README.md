# Bak

Backup files and folders

## Install

```shell
npm install -g bak
```

## Commands

### Create

Create a new configuration file

```shell
bak create <config_file>
```

### Add

Add a file or folder to a configuration file

```shell
bak add <file_folder> <config_file>
```

### Run

Run a configuration file

```shell
bak run <config_file>
```

## Configuration file

```jsonc
{
  // Directory where the backup will be made (required)
  "path": "",

  // Array with the files and folders to backup (optional)
  "backup": [
    {
      // Name of backup (optional)
      "name": "",

      // Description of backup (optional)
      "description": "",

      // Path to file or folder to backup (required)
      "path": "",

      // Type of compression: "", "7z", "zip" (optional, default="")
      "compression": "",

      // A subfolder is created inside the backup folder
      // with this name and it is where the content will be stored (optional)
      "subfolder": "",

      // Rename the file o folder with this patter (optional, default=current name of file/folder)
      // Patters can be used:
      // /s - Timestamp => yyyyMMddhhmmss
      // /d - Date => yyyyMMdd
      // /t - Time => hhmmss
      // /o - Original name of file/folder
      "rename": "",

      // Backup this item? (optional, default=true)
      "active" : true
    }
  ]
}
```
