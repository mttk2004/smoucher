with open('app/components/ui/TagInput.tsx', 'r') as f:
    content = f.read()

content = content.replace("import React, { useState } from 'react';", "import { useState } from 'react';")

with open('app/components/ui/TagInput.tsx', 'w') as f:
    f.write(content)
