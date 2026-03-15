import re

with open("app/routes/customers.tsx", "r") as f:
    content = f.read()

# Add imports
if 'import { Pagination }' not in content:
    imports = 'import { Pagination } from "../components/ui/Pagination";\nimport { Badge } from "../components/ui/Badge";\n'
    content = content.replace('import { PageHeader } from "../components/PageHeader";', 'import { PageHeader } from "../components/PageHeader";\n' + imports)

# Replace Pagination
pagination_pattern = r'<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">.*?</div>\s*</div>\s*</div>\s*</div>\s*\);\s*}'
pagination_replacement = r'''<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <Pagination start={1} end={4} total={2450} itemName="results" className="mt-0" />
        </div>
      </div>
    </div>
  );
}'''

content = re.sub(pagination_pattern, pagination_replacement, content, flags=re.DOTALL)

with open("app/routes/customers.tsx", "w") as f:
    f.write(content)
