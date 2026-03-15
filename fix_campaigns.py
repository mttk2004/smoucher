with open("app/routes/campaigns.tsx", "r") as f:
    content = f.read()

content = content.replace('      <Pagination start={1} end={4} total={12} itemName="campaigns" />\n    </div>\n    </div>\n  );\n}', '      <Pagination start={1} end={4} total={12} itemName="campaigns" />\n    </div>\n  );\n}')

with open("app/routes/campaigns.tsx", "w") as f:
    f.write(content)
