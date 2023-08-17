import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-forgot-password-header',
  templateUrl: './forgot-password-header.component.html',
  styleUrls: ['./forgot-password-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordHeaderComponent implements OnInit {
  constructor(public themeService: ThemeService) {}

  @Input() title: string;
  @Input() isType: string;

  ngOnInit(): void {}
}
