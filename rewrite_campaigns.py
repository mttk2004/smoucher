import re

with open("app/routes/campaigns.tsx", "r") as f:
    content = f.read()

# Replace Pagination
pagination_pattern = r'<div className="mt-6 flex items-center justify-between">.*?</div>\s*</div>'
pagination_replacement = r'''<Pagination start={1} end={4} total={12} itemName="campaigns" />
    </div>'''
content = re.sub(pagination_pattern, pagination_replacement, content, flags=re.DOTALL)

# Add imports
imports = 'import { Pagination } from "../components/ui/Pagination";\nimport { Badge } from "../components/ui/Badge";\n'
content = content.replace('import { PageHeader } from "../components/PageHeader";', 'import { PageHeader } from "../components/PageHeader";\n' + imports)

# Replace Badges
content = content.replace('<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">\n                  ACTIVE\n                </span>', '<Badge variant="success">ACTIVE</Badge>')
content = content.replace('<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">\n                  DRAFT\n                </span>', '<Badge variant="default">DRAFT</Badge>')
content = content.replace('<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">\n                  ENDED\n                </span>', '<Badge variant="info">ENDED</Badge>')
content = content.replace('<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">\n                  PAUSED\n                </span>', '<Badge variant="warning">PAUSED</Badge>')

with open("app/routes/campaigns.tsx", "w") as f:
    f.write(content)
