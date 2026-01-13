#!/usr/bin/env python3
"""
Storage Optimization Script for Rube Project
Analyzes, organizes, compresses, and optimizes storage usage
"""

import os
import json
import hashlib
import gzip
import shutil
from pathlib import Path
from collections import defaultdict

class StorageOptimizer:
    def __init__(self, base_path='.'):
        self.base_path = Path(base_path)
        self.duplicates = defaultdict(list)
        self.file_hashes = {}
        self.compression_candidates = []
        self.offload_candidates = []
        self.organization_plan = {}

    def calculate_file_hash(self, file_path):
        """Calculate SHA256 hash of a file"""
        hash_sha256 = hashlib.sha256()
        try:
            with open(file_path, 'rb') as f:
                for chunk in iter(lambda: f.read(4096), b''):
                    hash_sha256.update(chunk)
            return hash_sha256.hexdigest()
        except Exception as e:
            print(f"Error hashing {file_path}: {e}")
            return None

    def find_duplicates(self):
        """Find duplicate files based on content hash"""
        print("🔍 Scanning for duplicate files...")
        for file_path in self.base_path.rglob('*'):
            if file_path.is_file():
                try:
                    file_hash = self.calculate_file_hash(file_path)
                    if file_hash:
                        self.file_hashes[file_hash].append(file_path)
                except Exception as e:
                    print(f"Skipping {file_path}: {e}")

        # Identify duplicates (files with same hash)
        for hash_val, files in self.file_hashes.items():
            if len(files) > 1:
                self.duplicates[hash_val] = files
                print(f"📁 Found {len(files)} duplicates for hash {hash_val[:8]}...")

        return self.duplicates

    def analyze_compression_potential(self):
        """Identify files suitable for lossless compression"""
        print("\n📦 Analyzing compression potential...")

        compressible_extensions = {
            '.json', '.txt', '.md', '.js', '.css', '.html',
            '.xml', '.csv', '.log', '.sql', '.config'
        }

        for file_path in self.base_path.rglob('*'):
            if file_path.is_file():
                ext = file_path.suffix.lower()
                if ext in compressible_extensions:
                    file_size = file_path.stat().st_size
                    if file_size > 1024:  # Files larger than 1KB
                        self.compression_candidates.append(file_path)
                        print(f"📄 Compression candidate: {file_path} ({file_size/1024:.1f}KB)")

        return self.compression_candidates

    def identify_offload_candidates(self):
        """Identify files that can be offloaded to cloud storage"""
        print("\n☁️ Identifying offload candidates...")

        offload_patterns = [
            'backup', 'cache', 'archive', 'old', 'temp',
            'previous', 'backup', 'snapshot'
        ]

        for file_path in self.base_path.rglob('*'):
            if file_path.is_file():
                file_name = file_path.name.lower()
                if any(pattern in file_name for pattern in offload_patterns):
                    self.offload_candidates.append(file_path)
                elif any(pattern in str(file_path) for pattern in offload_patterns):
                    self.offload_candidates.append(file_path)

        # Remove duplicates from offload candidates
        self.offload_candidates = list(set(self.offload_candidates))
        print(f"📦 Found {len(self.offload_candidates)} offload candidates")

        return self.offload_candidates

    def create_organization_plan(self):
        """Create logical hierarchical organization plan"""
        print("\n🗂️ Creating organization plan...")

        self.organization_plan = {
            'current_structure': self._analyze_current_structure(),
            'proposed_structure': self._create_proposed_structure(),
            'migration_steps': self._generate_migration_steps()
        }

        return self.organization_plan

    def _analyze_current_structure(self):
        """Analyze current directory structure"""
        structure = {}
        for item in self.base_path.iterdir():
            if item.is_dir():
                structure[item.name] = {
                    'type': 'directory',
                    'size': self._get_dir_size(item),
                    'subitems': self._get_dir_contents(item)
                }
            else:
                structure[item.name] = {
                    'type': 'file',
                    'size': item.stat().st_size
                }
        return structure

    def _get_dir_size(self, dir_path):
        """Calculate directory size"""
        total_size = 0
        for item in dir_path.rglob('*'):
            if item.is_file():
                total_size += item.stat().st_size
        return total_size

    def _get_dir_contents(self, dir_path, max_depth=2, current_depth=0):
        """Get directory contents with limited depth"""
        if current_depth >= max_depth:
            return {"...": "max depth reached"}

        contents = {}
        for item in dir_path.iterdir():
            if item.is_dir():
                contents[item.name] = {
                    'type': 'directory',
                    'size': self._get_dir_size(item)
                }
                if current_depth < max_depth - 1:
                    contents[item.name]['subitems'] = self._get_dir_contents(
                        item, max_depth, current_depth + 1
                    )
            else:
                contents[item.name] = {
                    'type': 'file',
                    'size': item.stat().st_size
                }
        return contents

    def _create_proposed_structure(self):
        """Create proposed optimized structure"""
        return {
            'core': {
                'description': 'Essential project files',
                'contents': ['src/', 'lib/', 'bin/', 'package.json', 'README.md']
            },
            'data': {
                'description': 'Project data and databases',
                'contents': ['case_database/', 'system_reports/', 'analysis_reports/']
            },
            'backups': {
                'description': 'Compressed backups',
                'contents': ['backups/', 'archives/']
            },
            'cache': {
                'description': 'Temporary and cache files',
                'contents': ['.cache/', 'temp/']
            },
            'cloud_sync': {
                'description': 'Cloud storage synchronization',
                'contents': ['multi_cloud_storage/', 'icloud_cache/']
            },
            'logs': {
                'description': 'Log files',
                'contents': ['logs/']
            }
        }

    def _generate_migration_steps(self):
        """Generate migration steps"""
        return [
            "1. Identify and remove duplicate files",
            "2. Compress suitable files using gzip",
            "3. Organize files into logical structure",
            "4. Offload backup/cache files to cloud storage",
            "5. Clean up temporary files",
            "6. Verify integrity of optimized structure"
        ]

    def compress_files(self, dry_run=True):
        """Compress files using gzip"""
        print(f"\n🗜️ Compressing {len(self.compression_candidates)} files...")

        compressed_count = 0
        for file_path in self.compression_candidates:
            if dry_run:
                print(f"[DRY RUN] Would compress: {file_path}")
            else:
                try:
                    compressed_path = file_path.with_suffix(file_path.suffix + '.gz')
                    with open(file_path, 'rb') as f_in:
                        with gzip.open(compressed_path, 'wb') as f_out:
                            shutil.copyfileobj(f_in, f_out)

                    original_size = file_path.stat().st_size
                    compressed_size = compressed_path.stat().st_size
                    ratio = (1 - compressed_size/original_size) * 100

                    print(f"✅ Compressed {file_path} ({original_size} → {compressed_size} bytes, {ratio:.1f}% reduction)")
                    compressed_count += 1
                except Exception as e:
                    print(f"❌ Error compressing {file_path}: {e}")

        return compressed_count

    def generate_report(self):
        """Generate comprehensive storage optimization report"""
        report = {
            'storage_analysis': {
                'total_size': self._get_dir_size(self.base_path),
                'duplicate_files': len(self.duplicates),
                'duplicate_space_wasted': self._calculate_duplicate_space(),
                'compression_candidates': len(self.compression_candidates),
                'offload_candidates': len(self.offload_candidates)
            },
            'duplicates': {hex_hash[:8]: files for hex_hash, files in self.duplicates.items()},
            'compression_candidates': [str(f) for f in self.compression_candidates],
            'offload_candidates': [str(f) for f in self.offload_candidates],
            'organization_plan': self.organization_plan,
            'recommendations': self._generate_recommendations()
        }

        return report

    def _calculate_duplicate_space(self):
        """Calculate space wasted by duplicates"""
        wasted_space = 0
        for files in self.duplicates.values():
            if len(files) > 1:
                # Space wasted is (count - 1) * file size
                file_size = files[0].stat().st_size
                wasted_space += (len(files) - 1) * file_size
        return wasted_space

    def _generate_recommendations(self):
        """Generate optimization recommendations"""
        recommendations = []

        if self.duplicates:
            recommendations.append({
                'priority': 'high',
                'action': 'Remove duplicate files',
                'description': f'Found {len(self.duplicates)} sets of duplicate files wasting {self._calculate_duplicate_space()/1024/1024:.1f}MB',
                'files_affected': sum(len(files) for files in self.duplicates.values())
            })

        if self.compression_candidates:
            recommendations.append({
                'priority': 'medium',
                'action': 'Compress suitable files',
                'description': f'{len(self.compression_candidates)} files can be compressed for space savings',
                'estimated_savings': '30-70% depending on file type'
            })

        if self.offload_candidates:
            recommendations.append({
                'priority': 'low',
                'action': 'Offload to cloud storage',
                'description': f'{len(self.offload_candidates)} files can be moved to cloud storage',
                'benefit': 'Free up local storage while maintaining accessibility'
            })

        recommendations.append({
            'priority': 'high',
            'action': 'Organize logical structure',
            'description': 'Restructure files into logical hierarchical organization',
            'benefit': 'Improved maintainability and easier navigation'
        })

        return recommendations

    def save_report(self, report, output_file='storage_optimization_report.json'):
        """Save report to JSON file"""
        with open(output_file, 'w') as f:
            json.dump(report, f, indent=2)
        print(f"\n📊 Report saved to {output_file}")

if __name__ == "__main__":
    optimizer = StorageOptimizer()

    print("🚀 Starting Storage Optimization Analysis...")
    print("=" * 50)

    # Run all analysis steps
    duplicates = optimizer.find_duplicates()
    compression_candidates = optimizer.analyze_compression_potential()
    offload_candidates = optimizer.identify_offload_candidates()
    organization_plan = optimizer.create_organization_plan()

    # Generate and save report
    report = optimizer.generate_report()
    optimizer.save_report(report)

    print("\n🎯 Optimization Summary:")
    print(f"📁 Duplicate files found: {len(duplicates)}")
    print(f"📦 Files suitable for compression: {len(compression_candidates)}")
    print(f"☁️ Files suitable for offloading: {len(offload_candidates)}")
    print(f"📊 Total space that can be reclaimed: {optimizer._calculate_duplicate_space()/1024/1024:.1f}MB")

    print("\n💡 Recommendations:")
    for i, rec in enumerate(report['recommendations'], 1):
        print(f"{i}. [{rec['priority'].upper()}] {rec['action']}: {rec['description']}")