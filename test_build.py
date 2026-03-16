import subprocess
try:
    subprocess.check_call(['npm', 'run', 'build'])
except Exception as e:
    print(f"Build failed: {e}")
