/* Runtime helpers for the editable catalog data in catalog.js. */
(function (root) {
  const catalog = {
    version: 1,
    items: [],
    set(items) {
      this.items = items;
      return this.items;
    },
    toJSON() {
      return {
        version: this.version,
        generated_at: new Date().toISOString(),
        items: this.items
      };
    },
    download(filename = 'monster-catalog.json') {
      const blob = new Blob([JSON.stringify(this.toJSON(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    },
    async importFile(file) {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const items = Array.isArray(parsed) ? parsed : parsed.items;
      if (!Array.isArray(items)) throw new Error('Formato catalogo non valido');
      if (items.some(item => !item.id || !item.name || !item.description || !item.rarity || !Array.isArray(item.variants))) {
        throw new Error('Ogni scheda deve avere id, name, description, rarity e variants');
      }
      this.items = items;
      return items;
    }
  };

  root.MonsterCatalog = catalog;
})(window);
