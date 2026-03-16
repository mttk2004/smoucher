# Fix TagInput.tsx
with open('app/components/ui/TagInput.tsx', 'r') as f:
    content = f.read()

content = content.replace("import React, { useState, KeyboardEvent } from 'react';", "import React, { useState } from 'react';\nimport type { KeyboardEvent } from 'react';")

with open('app/components/ui/TagInput.tsx', 'w') as f:
    f.write(content)

# Fix vouchers.tsx
with open('app/routes/vouchers.tsx', 'r') as f:
    content = f.read()

content = content.replace("import { useState, useRef, useEffect } from \"react\";", "import { useState, useEffect } from \"react\";")
content = content.replace("import { VoucherResponse } from \"../types/dashboard\";", "import type { VoucherResponse } from \"../types/dashboard\";")

with open('app/routes/vouchers.tsx', 'w') as f:
    f.write(content)
