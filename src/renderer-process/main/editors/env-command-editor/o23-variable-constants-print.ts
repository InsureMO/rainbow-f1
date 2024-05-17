import {EnvVariableCategory, EnvVariableDef, EnvVariableValueType} from './variable-types';

export const O23ServerPluginPrintPdf: Array<EnvVariableDef> = [
	{
		name: 'CFG_PUPPETEER_EXECUTABLE_PATH', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.TEXT,
		description: 'Chromium path.'
	},
	{
		name: 'CFG_PUPPETEER_BROWSER_ARGS', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.TEXT,
		description: 'Chromium browser launch arguments. Format follows `--disable-gpu[,--no-sandbox[...]]`. See https://peter.sh/experiments/chromium-command-line-switches/ for more details.'
	},
	{
		name: 'CFG_PUPPETEER_BROWSER_CACHE', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.BOOLEAN, defaultValue: true,
		description: 'Use browser process cache or not.'
	},
	{
		name: 'CFG_PUPPETEER_DEVTOOLS_ENABLED', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.BOOLEAN, defaultValue: false,
		description: 'Open devtools or not. Only for debug purpose, never enable it in server.'
	},
	{
		name: 'CFG_PUPPETEER_HEADLESS_ENABLED', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.BOOLEAN, defaultValue: true,
		description: 'Use headless mode or not. Only for debug purpose, never disable it in server.'
	},
	{
		name: 'CFG_PUPPETEER_MAX_PAGES', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.NUMBER, defaultValue: 50,
		description: 'Maximum pages(tabs) in single browser, only works when browser cache is enabled.'
	},
	{
		name: 'CFG_PUPPETEER_VIEWPORT_WIDTH', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.NUMBER, defaultValue: 1920,
		description: 'Default viewport width, only works when "viewport" not present by constructor.'
	},
	{
		name: 'CFG_PUPPETEER_VIEWPORT_HEIGHT', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.NUMBER, defaultValue: 1080,
		description: 'Default viewport height, only works when "viewport" not present by constructor'
	},
	{
		name: 'CFG_PUPPETEER_PDF_HEADER_AND_FOOTER_DISPLAY', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.BOOLEAN,
		defaultValue: false,
		description: 'Show pdf header and footer or not, only works when "pdfOptions.displayHeaderFooter" not present by constructor.'
	},
	{
		name: 'CFG_PUPPETEER_PDF_BACKGROUND', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.BOOLEAN,
		defaultValue: false,
		description: 'Print background or not, only works when "pdfOptions.printBackground" not present by constructor.'
	},
	{
		name: 'CFG_PUPPETEER_PDF_FORMAT', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.TEXT,
		defaultValue: 'a4',
		description: 'Print page format, only works when "pdfOptions.format" not present by constructor.'
	},
	{
		name: 'CFG_PUPPETEER_PDF_TIMEOUT', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.NUMBER,
		defaultValue: 30,
		description: 'Print timeout, in seconds, only works when "pdfOptions.timeout" not present by constructor.'
	},
	{
		name: 'CFG_PUPPETEER_PAGE_KEEP', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_PDF,
		type: EnvVariableValueType.BOOLEAN,
		defaultValue: false,
		description: 'Keep browser page after printed, enable this feature will disable headless mode automatically, also, recommend to disable browser cache. Only for debug purpose, never enable it in server.'
	}
];
export const O23ServerPluginPrintCsvAndExcel: Array<EnvVariableDef> = [
	{
		name: 'CFG_CSV_TEMPORARY_FILE_KEEP', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_CSV,
		type: EnvVariableValueType.BOOLEAN,
		defaultValue: false,
		description: 'Only for debug purpose, never enable it in server.'
	},
	{
		name: 'CFG_CSV_TEMPORARY_FILE_USE', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_CSV,
		type: EnvVariableValueType.BOOLEAN,
		defaultValue: false,
		description: 'Use temporary file or not.'
	},
	{
		name: 'CFG_CSV_TEMPORARY_LINES_FRESH', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_CSV,
		type: EnvVariableValueType.NUMBER,
		defaultValue: 100,
		description: 'How many lines to fresh to temporary file.'
	},
	{
		name: 'CFG_CSV_TEMPORARY_DIR', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_CSV,
		type: EnvVariableValueType.TEXT,
		defaultValue: '.csv-temporary-files',
		description: 'Temporary file directory.'
	},
	{
		name: 'CFG_EXCEL_TEMPORARY_FILE_KEEP', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_XLSX,
		type: EnvVariableValueType.BOOLEAN,
		defaultValue: false,
		description: 'Only for debug purpose, never enable it in server.'
	},
	{
		name: 'CFG_EXCEL_TEMPORARY_DIR', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT_XLSX,
		type: EnvVariableValueType.TEXT,
		defaultValue: '.excel-temporary-files',
		description: 'Temporary file directory.'
	}
];
export const O23ServerPluginPrintWord: Array<EnvVariableDef> = [];
export const O23ServerPluginPrint: Array<EnvVariableDef> = [
	{
		name: 'CFG_APP_PLUGINS_PRINT', category: EnvVariableCategory.O23_SERVER_PLUGIN_PRINT,
		type: EnvVariableValueType.BOOLEAN,
		description: 'To enable the printing plugin. Depends on the @rainbow-o23/n91 module.'
	}
];
