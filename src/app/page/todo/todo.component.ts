import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  data: any[];
  copyData: any[];
  filterSearch: string;

  constructor(
    private api: ApiService,
    private ui: UiService) { }

  ngOnInit(): void {
    this.loadData();
  }
  async loadData(): Promise<any> {
    try {
      await this.ui.showLoading(true);
      this.data = await this.api.getMethod('todos');
      this.copyData = JSON.parse(JSON.stringify(this.data)); // hardCopy
      console.log(this.data)
      await this.ui.hideLoading();
    } catch (error) {
      console.log(error);
    }
  }

  filterByType(type) {
    switch (type) {
      case 'completed':
        this.data = this.copyData.filter(todo => todo.completed === true);
        break;
      case 'pending':
        this.data = this.copyData.filter(todo => todo.completed === false);
        break;

      default:
        this.data = this.copyData;
        break;
    }
  }
  uncomplete(index): void {
    this.data[index]['completed'] = false;
    this.copyData[index]['completed'] = false;
  }
  complete(index): void {
    this.data[index]['completed'] = true;
    this.copyData[index]['completed'] = true;
  }

  delete(index): void {
    this.data.splice(index, 1);
    this.copyData.splice(index, 1);
  }

  search(e, v): void {
    console.log(this.filterSearch);
  }
}
