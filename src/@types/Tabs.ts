import { type Ref } from 'vue';

interface Tab {
  title: string;
  hash: string;
  quantity: number;
}

interface AddTab {
  addTab: (value: Tab) => void;
}

export type { Tab, AddTab };
